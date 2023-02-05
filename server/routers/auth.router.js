const express = require('express'); 
const jwt = require('jsonwebtoken'); 
const router = express.Router();
const { verifyToken, registerUser, loginUser} = require('../controllers/auth.controller'); 


router.post('/login', loginUser); 
router.post('/register', registerUser); 

module.exports = router;
