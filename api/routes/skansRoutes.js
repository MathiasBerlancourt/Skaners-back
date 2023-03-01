const express = require("express");
const router = express.Router();
const skanController = require("../controllers/skanController");
const fileUpload = require("express-fileupload");

////// User add skan with his Id
router.post("/user/addSkan", fileUpload(), skanController.addSkan);
////// Admin allSkans
router.get("/admin/allSkans", skanController.allSkans);
////// Admin checkSkan isChecked -> true

module.exports = router;

//TODO Route admin allSkan, route checkSkan /:skanId, set true isChecked, then send it to the user with his id
