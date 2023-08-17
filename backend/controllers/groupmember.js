const Group = require("../models/group");
const User = require("../models/user");
const GroupMember = require("../models/groupmember");
const { Op } = require("sequelize");

exports.setGroupAdmins = async (req, res) => {
  const { groupId } = req.params;
  const { usernames } = req.body;

  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const isAdmin = await GroupMember.findOne({
      where: { GroupId: groupId, UserId: req.userId, isAdmin: true },
    });
    if (!isAdmin) {
      return res.status(403).json({ message: "Permission denied" });
    }

    const users = await User.findAll({
      where: { username: { [Op.in]: usernames } },
    });

    if (!users.length) {
      return res
        .status(404)
        .json({ message: "No users found with the provided usernames" });
    }

    // Set users as group admins
    await GroupMember.update(
      { isAdmin: true },
      {
        where: { GroupId: groupId, UserId: users.map((user) => user.id) },
      }
    );
    //if users are not group members but users they will be set as admins aswell however
    //it will not affect us as once we add him to group he is no longer admin again
    res.status(200).json({ message: "Users are now group admins" });
  } catch (error) {
    console.error("Error setting group admins:", error);
    res.status(500).json({ message: "Error setting group admins" });
  }
};

exports.removeMembersFromGroup = async (req, res) => {
  const { groupId } = req.params;
  const { usernames } = req.body;

  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const isAdmin = await GroupMember.findOne({
      where: { GroupId: groupId, UserId: req.userId, isAdmin: true },
    });

    if (!isAdmin) {
      return res.status(403).json({ message: "Permission denied" });
    }

    const users = await User.findAll({
      where: { username: { [Op.in]: usernames } },
    });

    if (!users.length) {
      return res
        .status(404)
        .json({ message: "No users found with the provided usernames" });
    }

    await GroupMember.destroy({
      where: { GroupId: groupId, UserId: users.map((user) => user.id) },
    });

    res.status(200).json({ message: "Users removed from the group" });
  } catch (error) {
    console.error("Error removing members from group:", error);
    res.status(500).json({ message: "Error removing members from group" });
  }
};

exports.addMembersToGroup = async (req, res) => {
  const { groupId } = req.params;
  const { usernames } = req.body;

  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const isAdmin = await GroupMember.findOne({
      where: { GroupId: groupId, UserId: req.userId, isAdmin: true },
    });
    if (!isAdmin) {
      return res.status(403).json({ message: "Permission denied" });
    }
    console.log(usernames);

    const users = await User.findAll({
      where: { username: { [Op.in]: usernames } },
    });

    if (!users.length) {
      return res
        .status(404)
        .json({ message: "No users found with the provided usernames" });
    }

    const groupMembers = users.map((user) => ({
      GroupId: groupId,
      UserId: user.id,
    }));
    await GroupMember.bulkCreate(groupMembers);

    res.status(201).json({ message: "Users added to the group" });
  } catch (error) {
    console.error("Error adding members to group:", error);
    res.status(500).json({ message: "Error adding members to group" });
  }
};
