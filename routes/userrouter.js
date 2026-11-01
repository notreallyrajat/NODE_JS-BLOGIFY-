const express = require("express");
const {SignUp,SignIn,LogOut} = require("../controller/users")
const UserSchema = require("../models/user")

const router = express.Router()

router.get("/signin",(req,res)=>{
     res.render("signin",{user:null})
})

router.get("/signup",(req,res)=>{
    res.render("signup",{user:null})
})

router.post("/Logout",LogOut)


router.post("/signup",SignUp)
router.post("/signin",SignIn)

module.exports = router