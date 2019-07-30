const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json({ extended: true }))

const routes = require('./routes')
app.use(routes)

module.exports = app
