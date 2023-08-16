const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");

const upload = multer({storage : uploadController.storage});
const uploadPost = multer({storage : uploadController.storage1});

//auth
router.post("/register",uploadPost.single("file"), authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//crud
router.get("/", userController.getAlluser);
router.get("/:id", userController.userInfo);
router.delete("/:id", userController.userDelete);
router.put("/:id", userController.userUpdate);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

//upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
