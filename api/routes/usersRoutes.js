const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

router.get("/user/info/:id", userController.userInfo);
router.put("/user/update/:id", userController.updateUser);
router.delete("/user/delete/:id", userController.deleteUser);
router.get("/api/users", userController.allUsers);

router.put("/user/addSneaker", userController.addSneaker);
router.put("/user/removeSneaker", userController.removeSneaker);

router.put("/user/addLike", userController.addLike);
router.put("/user/addLike", userController.removeLike);

// router.put("/user/addSkan", userController.addSkan);
// router.put("/user/removeSkan", userController.removeSkan);

module.exports = router;
