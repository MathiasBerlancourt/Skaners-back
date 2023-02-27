const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { users } = require("../../../models");

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.get("/info/:id", authController.userInfo);

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
