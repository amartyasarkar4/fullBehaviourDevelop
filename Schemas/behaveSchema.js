var mongoose=require("mongoose");

var newBehaveSchema=new mongoose.Schema({
    behavName:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    }
})

mongoose.model("Behavior",newBehaveSchema);