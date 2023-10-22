var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.Login);
router.post("/Session", userController.CurrentUser);

module.exports = router;
