var express=require("express");
var mongoose=require("mongoose");

var router=express.Router();
const Behave=mongoose.model("Behavior");

router.get("/allBehaves",(req,res)=>{
    Behave.find()
    .then(categs=>{
        res.json({categs});
    })
    .catch(err=>{
        res.status(411).json({error:"Some Problem Occur"});
        console.log(err);
    })
})
router.post("/getBhaveId",(req,res)=>{
    const {bhave}=req.body;
    console.log(bhave);
    console.log(bhave);
    Behave.findOne({behavName:req.body.bhave})
    .then(result=>{
        console.log(result);
        res.json({result});
    })
    .catch(err=>{
        res.status(411).json({error:"Some Problem Occur"});
        console.log(err);
    })
})

module.exports=router;