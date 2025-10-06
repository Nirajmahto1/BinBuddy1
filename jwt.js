const jwt = require('jsonwebtoken')

const jwtAuth = (req,res,next)=>{

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({message:"Invalid Token"})
     const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'});
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded
       
        next()
    }catch(err){
        res.status(501).json({message:"Internal Server Error"})
    }
}

const generateToken = (payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:30000})
}
module.exports = {jwtAuth,generateToken}