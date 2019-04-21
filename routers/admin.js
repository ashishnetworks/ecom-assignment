"use strict"
const express = require("express")
const router = express.Router()

router.get("/hi",function(req,res){
    res.send("hello from admin")
})


module.exports = router