const mongoose=require("mongoose");
const { JWT_SECRET } = require("../../key");
const User=mongoose.model("User");
const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(402).json({error:"You must be Log in"})
    }
    const token=authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"Your Login Expired"})
        }
        const {_id}=payload;
        User.findById(_id).then(userdata=>{
            req.user=userdata;
            next();
        })
    })

}