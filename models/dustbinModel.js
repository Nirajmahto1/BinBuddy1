const mongoose = require('mongoose')
const dustbinSchema = new mongoose.Schema({
    idN:{
        type:Number,
        required:true,
        unique:true
    },
    location:{
        type:[Number],
        required:true,
    },
    level:{
        type:Number,
        default:0
    }
})
const Dustbin = mongoose.model('Dustbin',dustbinSchema)
module.exports = Dustbin