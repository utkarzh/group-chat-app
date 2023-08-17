const Group = require("../models/group");
const User = require("../models/user");
const Message = require("../models/message");

// Send a message to the group
exports.sendMessage = async (req, res) => {
  const { groupId } = req.params;
  const { content } = req.body;

  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Create a new message
    const newMessage = await Message.create({
      content,
      GroupId: groupId,
      UserId: req.userId,
    });

    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Error sending message" });
  }
};

exports.getGroupMessages = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findByPk(groupId, {
      include: [
        {
          model: Message,
          include: [
            {
              model: User,
              attributes: ["id", "username"],
            },
          ],
        },
      ],
    });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Extract the group name
    const groupName = group.name;

    // Extract the messages from the group object
    const messages = group.Messages.map((message) => ({
      content: message.content,
      senderName: message.User.username, // Use "User" association directly
    }));

    // Combine the group name and messages in a response object
    const groupMessagesResponse = {
      groupName,
      messages,
    };
    console.log(groupMessagesResponse);

    res.status(200).json(groupMessagesResponse);
  } catch (error) {
    console.error("Error getting group messages:", error);
    res.status(500).json({ message: "Error getting group messages" });
  }
};
