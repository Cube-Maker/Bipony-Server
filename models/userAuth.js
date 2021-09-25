const mongoose = require('mongoose');


//user auth schema 
const userAuthSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },

}, {timestamps:true})

module.exports = mongoose.model('User', userAuthSchema);