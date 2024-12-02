const express = require('express')
const morgan = require('morgan')
const routes = require('./routes/routes')

const app = express()

// middlewares
app.use(express.json())
app.use(morgan('dev'))


// routes
app.use('/', routes)


module.exports = app