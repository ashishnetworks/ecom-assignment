"use strict"
"use strict"
const express = require("express")
const router = express.Router()

const user = require("./user")
const admin = require("./admin")

router.use("/admin",admin)
router.use("/user",user)

router.use("/",function(req,res){
    res.redirect("/user/sign")
})

module.exports = router