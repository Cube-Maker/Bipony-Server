const express = require('express');
const router = express.Router();

//import controllers 

const {vendorProductPost,getVendorProduct,getSpecificMyProduct,deleteProduct,getSpecificProduct,getVerifiedProduct,updateStatus} = require('../controllers/vendorProductController')

//import middleware 

const {vendorCheckLogin} = require('../middlewares/vendorCheckLogin')

//Router routes

//post routes 
router.post('/vendorProductPost',vendorCheckLogin, vendorProductPost);

//put routes 

router.put('/updateStatus',vendorCheckLogin, updateStatus);

//get routes 
router.get('/getVerifiedProduct',vendorCheckLogin, getVerifiedProduct);

router.get('/getVendorProduct',vendorCheckLogin, getVendorProduct);

router.get('/getSpecificMyProduct',vendorCheckLogin, getSpecificMyProduct);

router.get('/getSpecificProduct',vendorCheckLogin, getSpecificProduct);

//delete routes
router.delete('/deleteProduct',vendorCheckLogin, deleteProduct);

module.exports = router;