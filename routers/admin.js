"use strict"
const express = require("express")
const path = require("path")
const router = express.Router()
const userModel = require("../db/models/user")
const productModel = require("../db/models/products")
const passportOfficer = require("../helpers/passport.officer")

router.get("/hi",function(req,res){

    console.log(req.session)
    console.log(req.user)
    res.send("hello from user")
})

router.get("/sign",function(req,res){
    res.sendFile("admin-pages/sign.html",{
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
            password: password, address: address, type: "admin"
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
    successRedirect:"/admin/users",
    failureRedirect:"/admin/sign"
}))

router.use("/", function(req,res,next){
    if(req.user) {
        if(req.user.type == "admin"){
            next()
            return
        }
    }
    res.redirect("sign")
})

router.get("/profile",function(req,res){
    res.sendFile("admin-pages/profile.html",{
        root:path.join(__dirname,"../public/")
    })
})

router.get("/users",function(req,res){
    res.sendFile("admin-pages/users.html",{
        root:path.join(__dirname,"../public/")
    })
})

router.get("/getAllUsers",async function(req,res){
    let result = []
    try {
        result = await userModel.find()
    } catch(err) {
        console.log(err)
    }

    res.send(result)
})

router.get("/getUserDetail", async function(req,res){
    let result = {}
    let username = req.user.username
    try {
        result = await userModel.findOne({username:username},{password:0})
    } catch(err) {
        console.log(err)
    }

    res.send(result)
})

router.post("/updateUserDetail", async function(req,res){
    let body = req.body
    let username = req.user.username
    let updateObject = {}

    if(body.fullname) {
        updateObject.fullname = body.fullname
    }

    if(body.address) {
        updateObject.address = body.address
    }

    if(body.password) {
        updateObject.password = body.password
    }

    try {
        let result = await userModel.updateOne({username:username},updateObject)
        console.log(result)
        if(result.nModified) {
            res.send(true)
            return
        }
    } catch(err) {
        console.log(err)
    }

    res.send(false)

})

router.get("/delUser",async function(req,res){
    let result = false
    let username = req.query.username
    console.log(req.query)
    try {
        result = await userModel.deleteOne({username:username})
        console.log(result)
    } catch(err) {
        console.log(err)
    }

    res.send(result)
})

router.get("/products",function(req,res){

    res.sendFile("admin-pages/products.html",{
        root:path.join(__dirname,"../public/")
    })
})

router.get("/getProducts", async (req,res)=>{

    let products = {}
    try {
        products = await productModel.find().sort({_id:-1})
    } catch(err) {
        console.log(err)
    }

    res.send(products)
})

router.post("/addProduct", async function(req,res) {
    let body = req.body
    let productName = body.name || 0

    let quantity = 0
    try {
        quantity = parseInt(body.quantity)
    } catch(err) {
        console.log(err)
    }

    let price = 0
    try {
        price = parseFloat(body.price)
    } catch(err) {
        console.log(err)
    }

    if(productName && price) {
        let product = new productModel({name:productName, quantity: quantity, price: price})

        try {
            let result = await product.save()
            console.log(result)
            res.send(true)
            return
        } catch(err) {
            console.log(err)
        }
    }

    res.send(false)

})

router.post("/updateProduct", async function(req,res) {

    let body = req.body

    let id = body._id || 0
    let productName = body.name || 0

    let quantity = 0
    try {
        quantity = parseInt(body.quantity)
    } catch(err) {
        console.log(err)
    }

    let price = 0
    try {
        price = parseFloat(body.price)
    } catch(err) {
        console.log(err)
    }

    let updateObject = {name:productName, quantity:quantity, price:price}

    if(id && productName && price) {
        try {
            let result = await productModel.updateOne({_id:id},updateObject)
            if(result.nModified) {
                res.send(true)
                return
            }
        } catch(err) {
            console.log(err)
        }
    }

    res.send(false)

})

router.get("/deleteProduct", async function(req,res) {
    let query = req.query
    let id = query.id || 0

    if(id) {
        let result = await productModel.deleteOne({_id:id})
        if(result.deletedCount) {
            res.send(true)
            return
        }
    }

    res.send(false)

})

router.get("/orders",function(req,res){
    res.sendFile("admin-pages/orders.html",{
        root:path.join(__dirname,"../public/")
    })
})



module.exports = router