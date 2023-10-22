var express = require("express");
var router = express.Router();
const friendController = require("../controllers/friendContoller");

router.post("/send", friendController.sendFriendRequest);
router.get("/pending", friendController.PendingRequests);
router.post("/pendingname",friendController.PendingUsernames);
router.get("/incoming",friendController.IncomingRequests)
router.post("/incomingname",friendController.incomingUsernames)

module.exports = router;
