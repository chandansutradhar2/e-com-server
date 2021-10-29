const pController = require("../controllers/product.controller");

var express = require("express");
var router = express.Router();

router.post("/create", pController.createProduct);
router.post("/category/create", pController.createCategory);
router.get("/all", pController.getAllProduct);
router.get("/category/all", pController.getAllCategory);
router.post("/update", pController.updateProduct);
router.post("/category/check", pController.categoryExists);
module.exports = router;
