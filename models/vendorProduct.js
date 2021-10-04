const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
// vendor Schema

const vendorProductSchema = new mongoose.Schema({
    productTitles: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['hold','notVerify', 'delete','verified'],
        default: 'notVerify',
    },
    postedBy: {
        type: ObjectId,
        ref:'Vendor'
    }

})

module.exports = mongoose.model('VendorProduct', vendorProductSchema);