const express = require("express");
const router = express.Router();
const skanController = require("../controllers/skanController");
const adminController = require("../controllers/adminController");

////// Admin and TinderLikeCarousel allSkans
router.get("/allSkans", skanController.allSkans);
////// Admin checkSkan isChecked -> true
router.put("/checkSkan", adminController.checkSkan);
////// deleteSkans
router.delete("/deleteSkan", skanController.deleteSkan);

module.exports = router;

//TODO Route admin allSkan, route checkSkan /:skanId, set true isChecked, then send it to the user with his id
