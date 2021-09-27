const mongoose = require('mongoose');
const demo = require('../models/demo');

exports.demopost = async (req, res) => {
    const data = new demo({
        des: req.body.des,
    })
    try {
        const postParcel = await data.save();

        res.status(200).json({
            parcel: postParcel,
            message: "Parcel posted successfully",
        });
    } catch (err) {
        res.status(500).json({
            error: err,
        })
    }

}

exports.getPost = async (req, res) => {
    try {
        const data = await demo.find({}).sort('-createdAt');
        res.status(200).json({
            result: data,
            message: "find all parcel successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            error: err,
          });
    }
}