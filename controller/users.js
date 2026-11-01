const mongoose = require("mongoose")
const User = require("../models/user")
const{randomBytes,createHash} = require("crypto")
const {GenerateToken,ValidateToken} = require("../service/auth")

async function SignUp(req,res){
    const{fullname,email,password} = req.body;
    console.log(fullname)
    const user = await User.create({
        fullName : fullname,
        email:email,
        password:password,
    })
}

async function SignIn(req,res){
    const token = await User.PassToken(req,res)
    console.log(token)
    if(!token){
        return res.send("Beta Login karo izzat se :(")
    }
    console.log(token)
    const user = ValidateToken(token)
    req.user = user;
    res.redirect("/",)
    console.log("hello")
    
}

async function LogOut(req,res){
    console.log("Clear Kar bhai ")

    res.clearCookie("Token")
    res.redirect("/")
}

module.exports = {SignUp,SignIn,LogOut}