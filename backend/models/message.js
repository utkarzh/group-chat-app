const sequelize = require("../util/database");
const Sequelize = require("sequelize");
const Message = sequelize.define("Message", {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Message;
