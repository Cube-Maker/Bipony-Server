const mongoose = require('mongoose');
const VendorProduct = require('../models/vendorProduct');


// post product
exports.vendorProductPost = async (req, res) => {
    const data = new VendorProduct({
        productTitles: req.body.productTitles,
        productDescription: req.body.productDescription,
        productCategory: req.body.productCategory,
        productPrice: req.body.productPrice,
        productImage: req.body.productImage,
        postedBy:req.userId
    })
    try {
        const vendorProductPost = await data.save();

        res.status(200).json({
            product: vendorProductPost,
            message: "Product posted successfully",
        });
    } catch (err) {
        res.status(500).json({
            error: err,
        })
    }

}


//get all products
exports.getVendorProduct = async (req, res) => {
    try {
        const data = await VendorProduct.find({})
        .populate('postedBy','-password')
        .sort('-createdAt');
        res.status(200).json({
            result: data,
            message: "find all product successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            error: err,
          });
    }
}

// status update

exports.updateStatus = async (req, res) => {
    try {
        const result = await VendorProduct.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                status: 'verified'
            }
        }, { new: true, useFindAndModify: false })
        res.status(200).json({
            message: 'Status updated successfully'
        })
    } catch (err) {
        res.status(500).json({
            error: 'There was a server error'
        })
    }
}

//get product by verified

exports.getVerifiedProduct = async (req, res) => {
    try {
        const data = await VendorProduct.find({status:'verified'}).sort('-createdAt')
        res.status(200).json({
            result: data,
            message: "Your Requesting was Successfully Finished"
        })

    } catch (err) {
        res.status(500).json({
            error: 'There was an error finding all request'
        })
    }
}

//get product with specified id

exports.getSpecificProduct = async (req, res) => {
    try {
  
      const data = await VendorProduct.find({ _id: req.params.id}).sort('-createdAt')
      res.status(200).json({
        result: data,
        message: "Specific product find successfully",
      });
    } catch (err) {
      res.status(500).json({
        error: "There was a server error",
      });
    }
};

// specific user all products

exports.getSpecificMyProduct = async (req, res) => {
    try{
        
        const data = await VendorProduct.find({postedBy: req.userId._id})
        res.status(200).json({
            result: data,
            message: "Specific product find successfully",
          });
    }
    catch (err) {
      res.status(500).json({
        error: "There was a server error",
      });
    }
}



//delete product

exports.deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await VendorProduct.deleteOne({ _id: req.params.id }).sort('-createdAt');
        res.status(200).json({
            message: 'Product deleted successfully'
        })
    }
    catch (err) {
        res.status(500).json({
            error: 'There was a server error'
        })
    }
}