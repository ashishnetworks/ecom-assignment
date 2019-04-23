const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //for avoiding usage of outdate Promise library in mongoose library

/**
 * This is the schema of user balance table
 * @type {mongoose.Schema}
 */
module.exports = new mongoose.Schema({
    fullname: String,
    username: {type: String, index: {unique: true}},
    password: String,
    address: String
}, {timestamps: true, strict: false})