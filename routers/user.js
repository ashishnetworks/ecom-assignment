"use strict"
const express = require("express")
const path = require("path")
const router = express.Router()

router.get("/hi",function(req,res){
    res.send("hello from user")
})

router.get("/login",function(req,res){
    res.sendFile("user-pages/sign.html",{
        root:path.join(__dirname,"../public/")
    })
})

module.exports = router