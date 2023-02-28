const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const { users } = require("../../models");

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

router.get("/user/info/:id", userController.userInfo);
router.put("/user/update/:id", userController.updateUser);
router.delete("/user/delete/:id", userController.deleteUser);
router.get("/api/users", userController.allUsers);

router.put("/user/addSneaker", userController.addSneaker);
router.put("/user/removeSneaker", userController.removeSneaker);

module.exports = router;
