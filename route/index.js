'use strict'

const express = require('express')
const api = express()

const user = require('./users')

api.use('/users',  user) /* using user route */

module.exports = api