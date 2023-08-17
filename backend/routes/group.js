const express = require("express");
const router = express.Router();
const groupControllers = require("../controllers/group");
const verify = require("../middlewares/verify");

router.post("/create", verify.verifyToken, groupControllers.createGroup);

router.delete(
  "/user/groups/:groupId",
  verify.verifyToken,
  groupControllers.deleteGroup
);

router.get("/user/groups", verify.verifyToken, groupControllers.getUserGroups);

module.exports = router;
