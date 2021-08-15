'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const route = require('./route')
const app = express()
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/api/v1', route)

module.exports = app
