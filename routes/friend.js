var express = require("express");
var router = express.Router();
const friendController = require("../controllers/friendController");

router.post("/send", friendController.sendFriendRequest);
router.post("/pending", friendController.Pending);
router.post("/incoming", friendController.Incoming);
router.put("/accept", friendController.AcceptRequest);
router.put("/decline", friendController.DeclineRequest);
router.post("/incfriendlist", friendController.IncomingAccepted);
router.post("/penfriendlist", friendController.PendingAccepted);
router.delete("/cancel", friendController.CancelRequest);

module.exports = router;