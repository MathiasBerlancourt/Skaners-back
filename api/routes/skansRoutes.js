const express = require("express");
const router = express.Router();
const skanController = require("../controllers/skanController");
const adminController = require("../controllers/adminController");

////// Admin and TinderLikeCarousel allSkans
router.get("/allSkans", skanController.allSkans);
////// Admin checkSkan isChecked -> true
router.put("/checkSkan", adminController.checkSkan);
////// deleteSkans
router.delete("/deleteSkan/:id", skanController.deleteSkan);

module.exports = router;
