"use strict"
const express = require("express")
const path = require("path")
const router = express.Router()
const userModel = require("../db/models/user")
const passportOfficer = require("../helpers/passport.officer")

router.get("/hi",function(req,res){

    console.log(req.session)
    console.log(req.user)
    res.send("hello from user")
})

router.get("/sign",function(req,res){
    res.sendFile("user-pages/sign.html",{
        root:path.join(__dirname,"../public/")
    })
})

router.post("/signup", async function (req,res) {

    let result = {}

    let fullname = req.body.fullname || 0
    let username = req.body.username || 0
    let password = req.body.password || 0
    let password2 = req.body.password2 || 0
    let address = req.body.address || 0

    if(password != password2) {
        result.message = "Password1 should match password2"
        result.error = true
        res.send(result)
        return
    }

    if(fullname && username && password && password2 && address) {

        let user = new userModel({
            fullname:fullname, username: username,
            password: password, address: address, type: "simple"
        })

        try {
            let dbResponse = await user.save()
            result.error = false
            result.message = "Success"
        } catch(err) {
            result.error =  true
            result.message = err.message
        }
    } else {
        result.message = "Filling all the fileds is mandetory for signup"
        result.error = true
    }

    res.send(result)

})

router.post("/signin",passportOfficer.authenticate("local",{
    successRedirect:"/user/hi",
    failureRedirect:"/user/sign"
}))

// router.post("/signin",function(req,res) {
//     console.log("signin executed")
//     res.send(JSON.stringify(req.body))
// })

module.exports = router