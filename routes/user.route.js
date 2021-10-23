const usersController = require("../controllers/user.controller");
var express = require("express");
var router = express.Router();

router.post("/signup", usersController.signup);
router.post("/login", usersController.signin);
router.get("/getAllSeller", usersController.getAllSeller);
// router.get("/getCurrentUser", usersController.getCurrentUser);
// router.get("/getAllUser", usersController.getAllUser);
// router.post("/getUserById", usersController.getUserById);
// router.post("/updateName", usersController.test);

module.exports = router;
