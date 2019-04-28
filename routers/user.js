"use strict"
const express = require("express")
const path = require("path")
const router = express.Router()
const userModel = require("../db/models/user")
const productModel = require("../db/models/products")
const orderModel = require("../db/models/orders")
const passportOfficer = require("../helpers/passport.officer")

router.get("/hi", function (req, res) {
    res.send("hello from user")
})

router.get("/sign", function (req, res) {
    res.sendFile("user-pages/sign.html", {
        root: path.join(__dirname, "../public/")
    })
})

router.post("/signup", async function (req, res) {

    let result = {}

    let fullname = req.body.fullname || 0
    let username = req.body.username || 0
    let password = req.body.password || 0
    let password2 = req.body.password2 || 0
    let address = req.body.address || 0

    if (password != password2) {
        result.message = "Password1 should match password2"
        result.error = true
        res.send(result)
        return
    }

    if (fullname && username && password && password2 && address) {

        let user = new userModel({
            fullname: fullname, username: username,
            password: password, address: address, type: "simple"
        })

        try {
            let dbResponse = await user.save()
            result.error = false
            result.message = "Success"
        } catch (err) {
            result.error = true
            result.message = err.message
        }
    } else {
        result.message = "Filling all the fileds is mandetory for signup"
        result.error = true
    }

    res.send(result)

})

router.post("/signin", passportOfficer.authenticate("local", {
    successRedirect: "/user/productsPage",
    failureRedirect: "/user/sign"
}))

router.get("/signOut", function(req,res) {
        req.logout();
        res.redirect('sign');
})

router.use("/", function (req, res, next) {
    if (req.user) {
        next()
        return
    }
    res.redirect("/user/sign")

})

router.get("/profilePage", function(req,res){
    res.sendFile("user-pages/profile.html", {
        root: path.join(__dirname, "../public/")
    })

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

router.get("/productsPage", function (req, res) {

    res.sendFile("user-pages/products.html", {
        root: path.join(__dirname, "../public/")
    })
})

router.get("/getProducts", async function (req, res) {
    let products = []

    try {
        products = await productModel.find({},{})
    } catch (err) {
        console.log(err)
    }

    res.send(products)
})

router.post("/makeOrder", async function (req,res) {

    let body = req.body
    let username = req.user.username || 0
    let cart = body || []

    let price = cart.reduce((acmltr,item)=>acmltr+item.price,0)

    let result = false
    if(username && cart.length) {
        let orderData = {
            username,cart,price
        }
        let order = new orderModel(orderData)
        try {
            result = await order.save()
        } catch(err) {
            console.log(err)
        }
    }

    if(result) {
        result = result._id
    }

    res.send(result)
})

router.get("/ordersPage", function(req,res) {
    res.sendFile("user-pages/orders.html", {
        root: path.join(__dirname, "../public/")
    })

})

router.get("/getOrders", async function(req,res) {
    let orders = []
    let username = req.user.username || 0

    try {
        orders = await orderModel.find({username:username})
    } catch (err) {
        console.log(err)
    }

    res.send(orders)
})


module.exports = router