const usersController = require("../controllers/user.controller");
var express = require("express");
var router = express.Router();

router.post("/signup", usersController.signup);
router.post("/login", usersController.signin);

module.exports = router;
