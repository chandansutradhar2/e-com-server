const sellerController = require("../controllers/seller.controller");

var express = require("express");
var router = express.Router();

router.post("/create", sellerController.createSeller);
router.get("/all", sellerController.getAllSeller);
router.post("/update", sellerController.updateSeller);

module.exports = router;
