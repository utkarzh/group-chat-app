const express = require("express");
require("dotenv").config();
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const groupmemberRoutes = require("./routes/groupmember");
const groupRoutes = require("./routes/group");
const sequelize = require("./util/database");
const User = require("./models/user");
const Message = require("./models/message");
const GroupMember = require("./models/groupmember");
const Group = require("./models/group");

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/user", userRoutes);
app.use(groupRoutes);
app.use(groupmemberRoutes);
app.use(messageRoutes);
sequelize
  .sync()
  .then((_) => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });

User.belongsToMany(Group, { through: GroupMember });
Group.belongsToMany(User, { through: GroupMember });
GroupMember.belongsTo(User);
GroupMember.belongsTo(Group);
User.hasMany(Message);
Message.belongsTo(User);
Group.hasMany(Message);
Message.belongsTo(Group);
