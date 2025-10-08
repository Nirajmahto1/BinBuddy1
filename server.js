const express =  require('express')
const app = express();
const db = require('./db')
const bodyParser = require('body-parser')
require('dotenv').config()
app.use(bodyParser.json())
const Port = process.env.PORT || 3000;
const userRoute = require('./routes/userRoute')
const dustbinRoute = require('./routes/dustbinRoute')
const adminRoute = require('./routes/adminRoute')

app.use('/user',userRoute)
app.use('/dustbin',dustbinRoute)
app.use('/admin',adminRoute)
app.listen(Port)