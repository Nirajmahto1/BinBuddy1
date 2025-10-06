const express =  require('express')
const app = express();
const db = require('./db')
const bodyParser = require('body-parser')
require('dotenv').config()
app.use(bodyParser.json())
const Port = process.env.PORT || 3000;
const userRoute = require('./routes/userRoute')
app.use('/user',userRoute)
app.listen(Port)