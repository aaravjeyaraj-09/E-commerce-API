const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const {validateRegister,validateLogin} = require('../Middleware/validation.middleware');
const isAuth = require('../Middleware/auth.middleware');
const isAdmin = require('../Middleware/admin.middleware');

// Register
router.post('/register',validateRegister,authController.register);


// Login
router.post( '/login',validateLogin,authController.login);

//get user profile
router.get('/profile', isAuth, authController.getProfile); 

// Get all users (admin only)
router.get('/', isAuth, isAdmin, authController.getAllUsers);

// admin route
router.get('/admin', isAuth, isAdmin, authController.adminRoute);

module.exports = router;