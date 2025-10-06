const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
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
    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehicle',
        default:null
    },
    document:{
        type:String,
        required:true
    }

})
userSchema.pre('save',async function(next){
    const driver = this;
    if(!driver.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(driver.password,salt)
        driver.password = hashedPassword
        next()
    }catch(err){
        return next(err)
    }
})
const Driver = mongoose.model('Driver',driverSchema)
module.exports = Driver