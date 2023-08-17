const sequelize = require("../util/database");
const Sequelize = require("sequelize");
const Group = sequelize.define("Group", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});
module.exports = Group;
