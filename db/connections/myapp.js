'use strict'

const dbConnectionMaker = require('./helpers/dbConnectionMaker')

const config = require('../../config')

const connectionUrl = config.mongoConnectionUrl

const connection = dbConnectionMaker(connectionUrl)

module.exports = connection