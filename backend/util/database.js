const Sequelize = require("sequelize");

const sequelize = new Sequelize("chat-app", "root", process.env.DB_PASSWORD, {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;
