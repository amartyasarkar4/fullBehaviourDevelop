var express=require("express");
var mongoose=require("mongoose");

var router=express.Router();
const User=mongoose.model("User");
var bcrypt=require("bcrypt");
var jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../key");
const RequireLogin=require("./middleware/requireLogin");
const { json } = require("body-parser");

router.get("/am",(req,res)=>{
    res.send("Hello from Amartya Auth");
})
router.get("/profile",RequireLogin,(req,res)=>{
    console.log(req.user._id);
    User.find({_id:req.user.id})
    .then(me=>{
        res.json(me);
    })
    .catch(err=>{
        res.status(403).json({err:"You are Undifined User"})
        console.log(err);
    })

})
router.post("/psignUp",(req,res)=>{
    const {email,name,password}=req.body;
    if(!email||!name||!password){
        return res.status(403).json({error:"Please Enter all the Field"})
    }
    User.findOne({email:email})
    .then((prevState)=>{
        if(prevState){
            return res.status(401).json({error:"Email allready Exist !!"})
        }
        else{
            bcrypt.hash(password,12)
            .then((hashedPassword)=>{
                const muser=new User({
                    name,
                    email,
                    password:hashedPassword
                })
                muser.save()
                    .then(saveU=>{
                        res.json({message:"New Account Created Successfully."});
                        console.log("saved User");
                    })
                    .catch(error=>{
                        console.log(error);
                        res.status(401).json({error:"Due to Unknown Issue Can't Create"})
                    })
            })
        }
    })
    .catch(err=>{
        console.log(err);
    })
})
router.post("/psignIn",(req,res)=>{
    const {email,password}=req.body;
    console.log(password);
    if(!email||!password){
        return res.status(413).json({error:"Please Enter all the fields.!!!"});
    }
    User.findOne({email:email})
    .then(foundUser=>{
        if(!foundUser){
            res.status(403).json({error:"Invalid EMAIL or Password !! "})
            return;
        }
        bcrypt.compare(password,foundUser.password)
            .then((correctMatch)=>{
                if(correctMatch){
                    console.log(foundUser);
                    console.log(JWT_SECRET);
                    const token=jwt.sign({_id:foundUser._id},JWT_SECRET);
                    const {_id,name,email}=foundUser;
                    res.json({token,user:{_id,name,email},message:"Log in SuccessFul"});

                }else{
                    res.status(401).json({error:"Invalid Password"});
                }
            })
    })
    .catch(err=>{
        console.log(err);
    })
})
module.exports=router;
