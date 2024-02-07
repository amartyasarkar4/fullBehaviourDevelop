var mongoose=require("mongoose");

const {ObjectId}=mongoose.Schema.Types;
var newUserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    todos:[{
       type:ObjectId,
       ref:"Todo"
    }]
})

mongoose.model("User",newUserSchema);