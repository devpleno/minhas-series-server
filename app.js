const express = require('express')
const app = express()
const path = require('path')

const bodyParser = require('body-parser')
app.use(bodyParser.json({ extended: true }))

const routes = require('./routes')
app.use(routes)

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static('./build'))
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile('./build/index.html')
  })
}

module.exports = app
