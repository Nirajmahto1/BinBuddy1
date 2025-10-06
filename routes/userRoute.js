const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const Dustbin = require('../models/dustbinModel')
const { generateToken, jwtAuth } = require('../jwt')

router.post('/signup',async (req,res)=>{
    try{
    const data = req.body
    const {email,mobile} = req.body
    const isUser = await User.findOne({email:email})
    const isUser1 = await User.findOne({mobile:mobile})
    if(isUser || isUser1) return res.status(500).json({message:"User already Exists"})
    const user = new User(data)
    const result = await user.save()
    res.status(200).json({message:"Signup Successful"})
    }catch(err){
       
        res.status(500).json({message:"Internal Server Error"})
    }
})
router.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email:email})
     
        if(!user || !(await user.comparePassword(password))){
             return res.status(400).json({message:"Invalid Email or Password"})
        }
        const payload = {
            id:user.id
        }
        const token = generateToken(payload)
        res.status(200).json({token:token})
    }catch(err){
        
        res.status(500).json({message:"Internal Server Error"})
    }
})
router.put('/updatePassword',jwtAuth,async (req,res)=>{
    try{
    const userData = req.user
   
    const user = await User.findById(userData.id)
    const {currentPassword,newPassword} = req.body
    
    if(!user) return res.status(404).json({message:"User Not Found"})
    if(await user.comparePassword(currentPassword)){
        if(currentPassword == newPassword) return res.status(400).json({message:"Both Passwords Cant be same"})
        user.password = newPassword
        user.save()
    }else{
        return res.status(400).json({message:"Invalid Password"})
    }
     return res.status(200).json({message:"Password Changed Successfully"})
    }catch(err){
        console.log(err)
       res.status(500).json({message:"Internal Server Error"})
    }
})
router.get('/reports',jwtAuth,async (req,resp)=>{
    try{
   
    const userId = req.user.id
    const reports = await User.findById(userId)
    res.status(200).send(reports)
    }catch(err){
        res.status(500).json({message:"Internal Server Error"})
    }
})
router.post('/reports/:dustbinID',jwtAuth,async (req,res)=>{
    try{
        const dustbinId = req.params.dustbinID
        const dustbin = await Dustbin.findById(dustbinId)
        if(!dustbin) return res.status(404).json({message:"Dustbin Not Found"})
    
        const userData = req.user
        const user = await User.findById(userData.id)
        if(!user) return res.status(404).json({message:"User Not Found"})
        user.reports.push({dustbinID:dustbinId,issue:req.body.issue})
        await user.save()
        
        res.status(200).json({message:'Reported Successfully'})

    }catch(err){
        res.status(500).json({message:"Internal Server Error"})
  
    }
})
module.exports = router