var mongoose=require("mongoose");

const {ObjectId}=mongoose.Schema.Types;
var newtodoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    Desc:{
        type:String,
        required:true
    },
    behav:{
        type:String,
        required:true,
        index: "text"
    },
    behaveId:{
       type:ObjectId,
       ref:"Behavior"
    },
    userId:{
       type:ObjectId,
       ref:"User"
    }
})

mongoose.model("Todo",newtodoSchema);