"use strict";
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const userModel = require("../db/models/user")

passport.use(new LocalStrategy({},async function(username,password,done) {
    console.log("Local strategry executed")

    let userObject = null

    try {
        userObject = await userModel.findOne({username:username})
    } catch(err) {
        console.log(err)
    }

    if(userObject) {
        if(userObject.password === password) {
            console.log("password matched")
            done(null,userObject)
            return
        }
    }

    done(null,false,"Username or password mismatched")
}))

passport.serializeUser(function(user,done) {
    console.log("serialize executed")

    done(null,user)
})

passport.deserializeUser(function(user, done) {
    console.log("desirialize strategry executed")
    let  o = {username:user.username,type:user.type}
    done(null,o)
})

module.exports = passport