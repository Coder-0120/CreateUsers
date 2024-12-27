const express=require("express");
const app=express()
app.use(express.json());
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
const userModel=require("./models/user");
const path=require("path");

app.use(express.static(path.join(__dirname,'public')));

app.get("/",(req,res)=>{
    res.render("create");
})

app.get("/delete/:id",async(req,res)=>{
    let users=await userModel.findOneAndDelete(
        {_id:req.params.id});
        res.redirect("/read");
})

app.get("/edit/:id",async(req,res)=>{
    let users=await userModel.findOne(
        {_id:req.params.id});
        res.render("edit",{users});
})

app.post("/update/:id",async(req,res)=>{
    let {name,course,branch,email,contactno}=req.body;
    let users=await userModel.findOneAndUpdate(
        {_id:req.params.id},{name,email,course,branch,contactno},{new:true});
        res.redirect("/read");
})


app.get("/read",async(req,res)=>{
    let allusers=await userModel.find();
    res.render("read",{users:allusers});
})

app.post("/create",async(req,res)=>{
    let {name,course,branch,email,contactno}=req.body;
    const user=await userModel.create({
        name,
        course,
        branch,
        email,
        contactno
    });
    res.redirect("/read");
})


app.listen(3000);
