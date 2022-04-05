// build your server here and require it from index.js
const express = require('express')
const resourcesRouter = require('./resource/router')
const projectsRouter = require('./project/router')
const taskRouter = require('./task/router')

const server = express();

server.use(express.json())

server.use('/api/resources', resourcesRouter)

server.use('/api/projects', projectsRouter)

server.use('/api/tasks', taskRouter)

server.use( '*', (req, res) => {
    res.json({api: 'up'})
})

module.exports = server
