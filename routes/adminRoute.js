const express = require('express')
const { jwtAuth } = require('../jwt')
const Dustbin = require('../models/dustbinModel')
const User = require('../models/userModel')
const Driver = require('../models/driverModel')
const router = express.Router()
const isAdmin = async (data)=>{
    const user = await User.findById(data.id)
    if(user.role != 'admin' || !user){
        return false;
    }
    return true;
}
router.get('/driver/',jwtAuth,async (req,res)=>{
    try{
        const userData = req.user
        if(!isAdmin(userData)) return res.status(401).json({message:"Not Allowed"})
        const driverData = await Driver.find()
        res.status(200).json(driverData)
    }catch(err){
        res.status(500).json({message:'Internal Server Error'})
    }
})
router.post('/driver/add',jwtAuth,async (req,res)=>{
    try{
        const userData = req.user
        if(!isAdmin(userData))return res.status(401).json({message:"Not Allowed"})
        const driver = new Driver(req.body)
        await driver.save()
        return res.status(200).json({message:"Successfully Added Driver"})

    }catch(err){
         res.status(500).json({message:'Internal Server Error'})
    }
})


module.exports = router