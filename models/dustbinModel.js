const mongoose = require('mongoose')
const dustbinSchema = new mongoose.Schema({
    location:{
        type:[Number],
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    }
})