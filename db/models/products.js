'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //for avoiding usage of outdate Promise library in mongoose library

const myapp = require('../connections/myapp')


const dummySchema = require("./schema/productsSchema")

const productModel = myapp.model("products", dummySchema)

module.exports = productModel