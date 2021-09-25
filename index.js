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
    useUnifiedTopology : true,
})
.then(()=> console.log('Database connection established'))
.catch(err => console.log(err))




const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})