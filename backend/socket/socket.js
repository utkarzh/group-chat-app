const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Group = require("../models/group");
const Message = require("../models/message");

module.exports = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", async (socket) => {
    const { userId } = await jwt.verify(
      socket.handshake.auth.token,
      process.env.JWT_KEY
    );

    socket.userId = userId;

    const { username } = await User.findOne({ where: { id: socket.userId } });
    socket.userName = username;

    socket.on("join", (groupId) => {
      socket.join(groupId);
    });

    socket.on("leave", (groupId) => {
      socket.leave(groupId);
    });

    socket.on("sendMessage", async (data) => {
      const { groupId, content } = data;
      io.to(groupId).emit("message", {
        content,
        sender: socket.userName.toUpperCase(),
      });
      try {
        const group = await Group.findByPk(groupId);
        if (!group) {
          return;
        }

        const newMessage = await Message.create({
          content,
          GroupId: groupId,
          UserId: socket.userId,
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });
  });
  return io;
};
