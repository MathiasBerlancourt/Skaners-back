const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const isAuthenticated = require("../middleware/authMiddleware");
const fileUpload = require("express-fileupload");

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

router.get("/user/info/:id", userController.userInfo);
router.put("/user/update/:id", userController.updateUser);
router.delete("/user/delete/:id", userController.deleteUser);
router.get("/api/users", isAuthenticated, userController.allUsers);

router.put("/user/likeSneaker", userController.likeSneaker);
router.put("/user/unlikeSneaker", userController.unlikeSneaker);

router.put("/user/likePicture", userController.likePictures);
router.put("/user/unlikePicture", userController.unlikePictures);

////// User add skan with his id
router.post("/user/addSkan", fileUpload(), userController.addSkan);
router.put("/user/likeSkan", userController.likeSkan);
router.put("/user/unlikeSkan", userController.unlikeSkan);

// router.put("/user/removeSkan", userController.removeSkan);

module.exports = router;
