const Group = require("../models/group");
const User = require("../models/user");
const Message = require("../models/message");

exports.sendMessage = async (req, res) => {
  const { groupId } = req.params;
  const { content } = req.body;

  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

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

    const groupName = group.name;

    const messages = group.Messages.map((message) => ({
      content: message.content,
      senderName: message.User.username,
    }));

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
