"use strict";
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const userModel = require("../db/models/user")

passport.use(new LocalStrategy({},async function(username,password,done) {

    let userObject = null

    try {
        userObject = await userModel.findOne({username:username})
    } catch(err) {
        console.log(err)
    }

    if(userObject) {
        if(userObject.password === password) {
            done(null,userObject)
            return
        }
    }

    done(null,false,"Username or password mismatched")
}))

passport.serializeUser(function(user,done) {
    done(null,user)
})

passport.deserializeUser(function(user, done) {
    let  o = {username:user.username,type:user.type}
    done(null,o)
})

module.exports = passport