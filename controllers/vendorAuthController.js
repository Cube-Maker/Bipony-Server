const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Vendor = require('../models/vendorAuth');

// Signup function

exports.vendorSignup = async (req, res) =>{
    try {

        // checking email is already registered or not
        const vendorSignUp  = await Vendor.findOne({ email: req.body.email});
        const vendorSignUpShope  = await Vendor.findOne({shopName: req.body.shopName});
            if(vendorSignUp || vendorSignUpShope){
                res.status(404).json({
                    error: 'Email/ShopName is already taken'
                })
            } else{

                // password hashing for security
                const hashPassword = await bcrypt.hash(req.body.password, 10);
                //taking user info
                const newVendorUser = new Vendor({
                    name: req.body.name,
                    shopName:req.body.shopName,
                    email: req.body.email,
                    phone: req.body.phone,
                    shopDescription: req.body.shopDescription,
                    shopCategory: req.body.shopCategory,
                    password: hashPassword,
                    photo: req.body.photo,
                    country: req.body.country,
                    
                });

                // Save user Information
                await newVendorUser.save();
                res.status(200).json({
                    newVendorUser,
                    message: 'signup successfully',
                });
            }

    } catch(err) {
        res.status(500).json({
            message: 'signup error find!!!',
        });
    }
}

//SignIn Function

exports.vendorSignIn = async (req, res) => {
    try {

        //checking email is already registered or not
        const VendorUser = await Vendor.find({ email: req.body.email });
        // console.log(user)
        // console.log(user[0]);

        //if user is registered?
        if (VendorUser && VendorUser.length > 0) {
            //compare this user password against hash password.
            const isValidPassword = await bcrypt.compare(req.body.password, VendorUser[0].password);
            //if password is valid then go to this condition.
            if (isValidPassword) {

                //generate jwt token 

                const token = jwt.sign(
                    {
                        shopName: VendorUser[0].shopName,
                        userId: VendorUser[0]._id,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '10d',
                    }
                );
                res.status(200).json({
                    
                    //saving the token & data.
                    vendor_access_token: token,
                    message: 'login successfully',
                    data: VendorUser[0]
                });
            } else {
                res.status(401).json({
                    error: 'authentication failed',
                });
            }
            // console.log(user[0]._id)
            // console.log(user[0].firstName);
        } else {
            res.status(401).json({
                error: 'authentication failed',
            });
        }
    } catch(err) {
        res.status(401).json({
            error: 'authentication failed',
        });
    }
};
