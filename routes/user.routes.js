const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require("../controllers/user.controller");

//auth
router.post('/register',authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout',authController.logout);

//crud
router.get('/',userController.getAlluser);
router.get('/:id',userController.userInfo);
router.delete('/:id',userController.userDelete);
router.put('/:id',userController.userUpdate);
router.patch("/follow/:id",userController.follow);
router.patch("/unfollow/:id",userController.unfollow);

module.exports = router 