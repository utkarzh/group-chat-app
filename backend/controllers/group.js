const Group = require("../models/group");
const Message = require("../models/message");
const UserGroup = require("../models/groupmember");
const sequelize = require("../util/database");
const GroupMember = require("../models/groupmember");

exports.createGroup = async (req, res) => {
  const { name } = req.body;
  const t = await sequelize.transaction();
  console.log(req.userId, "this is userid inside gorup");
  ``;
  try {
    const group = await Group.create({ name }, { transaction: t });
    console.log("Group has been created");

    await UserGroup.create(
      {
        GroupId: group.id,
        UserId: req.userId,
        isAdmin: true,
      },
      { transaction: t }
    );
    await t.commit();
    return res.status(201).json({ message: "Group created successfully" });
  } catch (error) {
    await t.rollback();
    console.error("Error creating group:", error);
    return res.status(500).json({ message: "Error creating group" });
  }
};

exports.getUserGroups = async (req, res) => {
  const userId = req.userId;

  try {
    const userGroups = await UserGroup.findAll({
      where: { UserId: userId },
      include: [{ model: Group }],
    });

    const formattedGroups = userGroups.map((userGroup) => ({
      groupName: userGroup.Group.name,
      isAdmin: userGroup.isAdmin,
      groupId: userGroup.Group.id,
    }));

    return res.status(200).json(formattedGroups);
  } catch (error) {
    console.error("Error getting user groups:", error);
    return res.status(500).json({ message: "Error getting user groups" });
  }
};

exports.deleteGroup = async (req, res) => {
  const { groupId } = req.params;
  const userId = req.userId;
  console.log("we are here inside of this");
  const transaction = await sequelize.transaction();
  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const groupAdmin = await UserGroup.findOne({
      where: { GroupId: groupId, UserId: userId, isAdmin: true },
      transaction,
    });

    if (!groupAdmin) {
      return res
        .status(403)
        .json({ message: "Only the group admin can delete the group" });
    }

    await Promise.all([
      Message.destroy({ where: { GroupId: groupId }, transaction }),

      UserGroup.destroy({ where: { GroupId: groupId }, transaction }),

      Group.destroy({ where: { id: groupId }, transaction }),
    ]);

    transaction.commit();

    return res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    await transaction.rollback();
    return res.status(500).json({ message: "Error deleting group" });
  }
};
