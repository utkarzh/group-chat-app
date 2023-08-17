const express = require("express");
const router = express.Router();
const groupMemberControllers = require("../controllers/groupmember");
const verify = require("../middlewares/verify");

router.put(
  "/:groupId/setAdmins",
  verify.verifyToken,
  groupMemberControllers.setGroupAdmins
);

router.post(
  "/:groupId/addMembers",
  verify.verifyToken,
  groupMemberControllers.addMembersToGroup
);

router.delete(
  "/:groupId/removeMembers",
  verify.verifyToken,
  groupMemberControllers.removeMembersFromGroup
);

module.exports = router;
