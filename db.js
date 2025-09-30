const mongoose = require('mongoose')
require('dotenv').config()

const mongoURL = process.env.MONGODB_URL_LOCAL

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
 const db = mongoose.connection

 db.on('connected',()=>{
    console.log('Mongo Db connected')
 })
db.on('error',(err)=>{
    console.error("MongoDb connection error:",err)

})
db.on('disconnected',()=>{
    console.log('MongoDb Disconnected')
})