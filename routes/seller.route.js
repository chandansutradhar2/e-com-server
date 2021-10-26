const sellerController = require("../controllers/seller.controller");

var express = require("express");
var router = express.Router();

router.post("/create", sellerController.createSeller);
router.get("/getAllSeller", sellerController.getAllSeller);

module.exports = router;
