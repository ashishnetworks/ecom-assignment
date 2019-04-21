"use strict";
const express = require("express")
const app = express()
const serverPort = 3000
const path = require("path")
const expressSession = require("express-session")
const cookieParser = require("cookie-parser")
const passport = require("passport")
const router = require("./routers/index")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.set("views",path.join(__dirname,"public"))
app.use("/static",express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")

app.use(expressSession({secret:"thisIsSecrate",saveUninitialized:true,resave:true}))
app.use(passport.initialize())
app.use(passport.session())

app.use("/",router)

app.listen(serverPort,function () {
    console.log(`Server started listening onm ${serverPort}`)
})