const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //for avoiding usage of outdate Promise library in mongoose library

/**
 * @type {mongoose.Schema}
 */
module.exports = new mongoose.Schema({
    username: String,
    cart: [],
    price: Number
}, {timestamps: true, strict: false})