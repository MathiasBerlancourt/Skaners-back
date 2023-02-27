const express = require("express");
const router = express.Router();

const { users } = require("../../../models");
console.log(users);
router.get("/api/users", async (req, res) => {
  try {
    const usersList = await users.find();
    res.status(200).json(usersList);
  } catch (e) {
    console.log(e);
    return "Error";
  }
});

module.exports = router;
