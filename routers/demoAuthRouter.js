const express = require('express');
const router = express.Router();


const {demopost, getPost} = require('../controllers/demoController')
const {checkLogin} = require('../middlewares/checkLogin');



router.post('/postData',checkLogin,demopost);
router.get('/getPost',checkLogin, getPost)

module.exports = router;