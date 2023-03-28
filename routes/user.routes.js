const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require("../controllers/user.controller");

//auth
router.post('/register',authController.signUp);

//crud
router.get('/',userController.getAlluser);
router.get('/:id',userController.userInfo);
router.delete('/:id',userController.userDelete);
router.put('/:id',userController.userUpdate);

module.exports = router 