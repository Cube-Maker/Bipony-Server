const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

//user auth schema 
const vendorAuthSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    shopName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
    },
    shopDescription: {
        type: String,
        required: true,
    },
    shopCategory: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Vendor', vendorAuthSchema);