const express = require('express')
const { jwtAuth } = require('../jwt')
const Dustbin = require('../models/dustbinModel')
const User = require('../models/userModel')
const router = express.Router()


router.get("/",async (req,res)=>{
    try{
        const dustbins = await Dustbin.find()
       
        res.status(200).json(dustbins)
    }catch(err){
        return res.status(500).json({message:"Internal Server Error"})
    }
})
router.post('/add',jwtAuth,async (req,res)=>{
    try{
        const userData = req.user
        const user = await User.findById(userData.id)
        if(user.role != 'admin'){
            return res.status(401).json({message:"You are not a admin"})
        }
        const dustbin = new Dustbin(req.body)
        await dustbin.save()
        
        res.status(200).json({message:"Dustbin added Successfully"})
    }catch(err){
        if(err.errorResponse.code == 11000) return res.status(500).json({message:"Duplicate ID"})
        return res.status(500).json({message:"Internal Server Error"})
    }
})
module.exports = router