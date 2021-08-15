'use strict'

const dotenv = require('dotenv')
dotenv.config({ path: './.env' });
const app = require('./app')
const port = process.env.PORT

const connectDB = require('./config/index');
connectDB();



var server = app.listen(port, () => {
    console.log('Ejecutando express', port)
})

server.setTimeout(500000)