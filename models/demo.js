const mongoose = require('mongoose');

const demoSchema = new mongoose.Schema({
    des:{
        type:String
    }
})

module.exports = mongoose.model('demo', demoSchema);