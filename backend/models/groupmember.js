const sequelize = require("../util/database");
const Sequelize = require("sequelize");
const GroupMember = sequelize.define("GroupMember", {
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = GroupMember;
