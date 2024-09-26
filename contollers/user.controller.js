const {v4:uuidv4}=require("uuid");
const User = require("../models/user.model");
const { setUser } = require("../services/auth");

const userSignup=async (req,res)=>{
    const {name,email,password}=req.body;

    const user=await User.create({
        name,
        email,
        password
    });

    return res.redirect("/");
}

const userLogin=async (req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({
        email,
        password
    });

    if(!user){
        return res.render("login",{error:"Invalid email or password"});
    }
    //generating jwt token
    const token=setUser(user);
    res.cookie("token",token); //any name can be given

    return res.redirect("/");
}

module.exports={userSignup,userLogin}