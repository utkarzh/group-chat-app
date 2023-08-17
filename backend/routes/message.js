const express = require("express");
const router = express.Router();
const messageControllers = require("../controllers/message");
const verify = require("../middlewares/verify");

router.post(
  "/:groupId/sendMessage",
  verify.verifyToken,
  messageControllers.sendMessage
);

router.get(
  "/:groupId/messages",
  verify.verifyToken,
  messageControllers.getGroupMessages
);

module.exports = router;
