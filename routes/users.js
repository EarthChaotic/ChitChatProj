var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);
router.post("/register",userController.register);
router.post("/login",userController.Login);

module.exports = router;
