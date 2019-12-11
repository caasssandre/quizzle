const path = require('path')
const express = require('express')

const server = express()

const users = require('./routes/users')
const teams = require('./routes/teams')

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.use('/api/v1/users', users)
server.use('/api/v1/teams', teams)

module.exports = server
