const express=require('express');
const router=express.Router();
const userController=require('../Controller/userController');


router.get('/all-users',userController.getAllUsers);

router.get('/current-user/:id',userController.getUser)

router.post('/register',userController.registerController);

router.post('/login',userController.loginController);

module.exports=router;  