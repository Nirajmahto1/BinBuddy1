const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    reports:[
        {
            dustbinID:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Dustbin',
                required:true
            },
            issue:{
                type:String,
                required:true
            },
            status:{
                type:String,
                required:true,
                default:'Received'
            },
            createdAt:{
                type:Date,
                default:Date.now()
            }
        }
    ]
})
const User = mongoose.model('User',userSchema)
module.exports = User