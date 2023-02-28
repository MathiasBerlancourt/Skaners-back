const { skans } = require("../../models");
const express = require("express");
const router = express.Router();

router.get("/add", async (req, res) => {});
module.exports = router;

//TODO add skans by user, Route admin allSkan, route checkSkan /:skanId, set true isChecked, then send it to the user with his id
