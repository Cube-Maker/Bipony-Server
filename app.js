const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())

// Database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser : true,
    useUnifiedTopology : false,
})
.then(()=> console.log('Database connection established'))
.catch(err => console.log(err))





// import routes
const userAuthRouters = require('./routers/userAuthRouter')
const demoAuthRouters = require('./routers/demoAuthRouter')
const vendorAuthRoutes = require('./routers/vendorAuthRouter')
const vendorProductRouters = require('./routers/vendorProductRouter')

//app middleware


//middleware
app.use('/api', userAuthRouters)
app.use('/api', demoAuthRouters)
app.use('/api', vendorAuthRoutes)
app.use('/api',vendorProductRouters)


//testing heroku deployment

app.get('/', (req, res) => {
    res.send('checking heroku deployment')
})


//default error handler

const errorHandler = (err, req, res, next) => {
    if(res.headersSent){
        return next(err)
    }
    res.status(500).json({ error:err })
}

app.use(errorHandler)

module.exports = app;