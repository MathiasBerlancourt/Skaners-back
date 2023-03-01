const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const fileUpload = require("express-fileupload");

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

router.get("/user/info/:id", userController.userInfo);
router.put("/user/update/:id", userController.updateUser);
router.delete("/user/delete/:id", userController.deleteUser);
router.get("/api/users", userController.allUsers);

router.put("/user/likeSneaker", userController.likeSneaker);
router.put("/user/unlikeSneaker", userController.unlikeSneaker);

// router.put("/user/likePicture", userController.likePicture);
// router.put("/user/unlikePicture", userController.unlikePicture);

////// User add skan with his Id
router.post("/user/addSkan", fileUpload(), userController.addSkan);
router.put("/user/likeSkan", userController.likeSkan);

// router.put("/user/removeSkan", userController.removeSkan);

module.exports = router;
