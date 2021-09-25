const express = require('express');
const router = express.Router();


//import controllers 
const {signup, signIn} = require('../controllers/userAuthController')


// import middleware



//Router routes

//post routes
router.post('/signup',  signup);
router.post('/signin',  signIn);





module.exports = router;