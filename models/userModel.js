const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
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
    points:{
        type:Number,
        default:0
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
userSchema.pre('save',async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password,salt)
        user.password = hashedPassword
        next()
    }catch(err){
        return next(err)
    }
})
userSchema.methods.comparePassword = async function(password){
    try{
        const isMatch = bcrypt.compare(password,this.password)
        return isMatch
    }catch(err){
        throw err;
    }
}
const User = mongoose.model('User',userSchema)
module.exports = User