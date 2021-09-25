const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userAuth');


exports.signup = async (req, res) =>{
    try {
        const userSignUp  = await User.findOne({email: req.body.email});
            if(userSignUp){
                res.status(404).json({
                    error: 'Email is already taken'
                })
            } else{
                const hashPassword = await bcrypt.hash(req.body.password, 10);
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashPassword,
                    phone: req.body.phone,
                    
                });

                // User.regis
                await newUser.save();
                res.status(200).json({
                    newUser,
                    message: 'signup successfully',
                });
            }

    } catch {
        res.status(500).json({
            message: 'signup error find!!!',
        });
    }
}


exports.signIn = async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });
        console.log(user)
        console.log(user[0]);
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
            if (isValidPassword) {
                const token = jwt.sign(
                    {
                        firstName: user[0].firstName,
                        userId: user[0]._id,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '10d',
                    }
                );
                res.status(200).json({
                    access_token: token,
                    message: 'login successfully',
                    data: user[0]
                });
            } else {
                res.status(401).json({
                    error: 'authentication failed',
                });
            }
            console.log(user[0]._id)
            console.log(user[0].firstName);
        } else {
            res.status(401).json({
                error: 'authentication failed',
            });
        }
    } catch {
        res.status(401).json({
            error: 'authentication failed',
        });
    }
};
