var express=require("express");
var mongoose=require("mongoose");

var router=express.Router();
const Todo=mongoose.model("Todo");
const User=mongoose.model("User");
const Behave=mongoose.model("Behavior");

const RequireLogin=require("./middleware/requireLogin");

router.post("/fetchtodos",RequireLogin,(req,res)=>{
    console.log(req.user._id);
    const {behavName}=req.body;
    console.log(behavName);
    Todo.find({behav:behavName})
    .where('userId').equals(req.user._id)
    .then(ftd=>{
        console.log(ftd);
        res.json(ftd);
    })
    
})

router.post("/fetchTDbyId",RequireLogin,(req,res)=>{
    console.log(req.user._id);
    Todo.findById(req.body.tdid)
    .then(ftd=>{
        res.json({success:"Fetched Todo Data",ftd:ftd});
    }).catch(err=>{
        console.log(err);
        res.status(407).json({error:"Could not Find Your Skill or Performance"})
    })
})


// "compound":{
                //     "must":{
                //         "equals":{
                //             "path":"behav",
                //             "value":{behavName}
                //         }
                //     }
                // }
router.post("/createtodos",RequireLogin,(req,res)=>{
    console.log(req.user._id);
    const {title,description,behavName,bhid}=req.body;
    console.log(title);
    console.log(description);
    console.log(behavName);
    console.log(bhid);
    // const bhid=Behave.findOne({behavName:behavName})
    // .then(res=>{
    //     return res._id;
    // }).catch(err=>{
    //     return 0;
    // })
    console.log("bhid");
    console.log(bhid);
    const mtod=new Todo({
        title:title,
        Desc:description,
        behav:behavName,
        behaveId:bhid,
        userId:req.user._id
    })
    console.log(mtod);
    mtod.save()
        .then(savTd=>{
            User.findByIdAndUpdate(req.user._id,{
                $push:{todos:savTd._id}
            }).then((updateg)=>{
                res.json({f:updateg})
            })
            .catch(err=>{
                console.log(err)
            })
            
        })
        .catch(err=>{
            console.log("Can not save")
        })
})
router.post("/updatetodos",RequireLogin,(req,res)=>{
    console.log(req.user._id);
    const {tdid,title,description}=req.body;
    Todo.findByIdAndUpdate(tdid,{
        title:title,
        Desc:description
    })
    .then(utd=>{
        res.json({success:"Updated Todo Data",utd:utd});
    }).catch(err=>{
        console.log(err);
        res.status(407).json({error:"Could not Update Your Skill or Performance"})
    })
})
router.post("/deletetodos",RequireLogin,(req,res)=>{
    console.log("hhh");
    console.log(req.user._id);
    Todo.findById(req.body.tdid)
    .then(ftd=>{
        console.log("hhh");
        console.log(ftd);
        if(`${ftd.userId}`==`${req.user._id}`){
            Todo.findByIdAndDelete(req.body.tdid)
            .then(dltd=>{
                User.findByIdAndUpdate(req.user._id,{
                    $pull:{todos:req.body.tdid}
                })
                .then(ufd=>{
                   return res.json({success:"Deleted Todo Data and Updated User data",deleteTD:dltd,user:ufd});
            
                }).catch(err=>{
                    return res.json({success:"Deleted Todo Data",dltd:dltd});
                })
                
            }).catch(err=>{
                console.log(err);
                res.status(407).json({error:"Could not Delete Your Skill or Performance"})
            })
        }else{
            res.status(408).json({error:"You have no Right to delete others work",user:req.user._id,Owner:ftd.userId});
        }
    })
    
})
module.exports=router;