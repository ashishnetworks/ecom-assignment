const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //for avoiding usage of outdate Promise library in mongoose library

/**
 * This is the schema of user balance table
 * @type {mongoose.Schema}
 */
module.exports = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number
}, {timestamps: true, strict: false})