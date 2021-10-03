const express = require('express');
const router = express.Router();


//import controllers 
const {vendorSignup, vendorSignIn} = require('../controllers/vendorAuthController')


// import middleware



//Router routes

//post routes
router.post('/vendorSignup',  vendorSignup);
router.post('/vendorSignIn',  vendorSignIn);





module.exports = router;