const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/identityprac");

const userSchema=mongoose.Schema({
    name:String,
    course:String,
    branch:String,
    email:String,
    contactno:String
})

module.exports=mongoose.model("user",userSchema);