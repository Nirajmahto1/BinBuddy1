const express = require('express')
const { jwtAuth } = require('../jwt')
const Dustbin = require('../models/dustbinModel')
const User = require('../models/userModel')
const router = express.Router()


router.get("/",async (req,res)=>{
    try{
        const dustbins = await Dustbin.find()
        const records = dustbins.map((data)=>{
            return {
                id:data.idN,
                location:data.location,
                level:data.level
            }
        })
        res.status(200).json(records)
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
        dustbin.save()
        res.status(200).json({message:"Dustbin added Successfully"})
    }catch(err){
        return res.status(500).json({message:"Internal Server Error"})
    }
})

module.exports = router