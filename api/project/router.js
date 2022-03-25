// build your `/api/projects` router here
const router = require('express').Router()
const Project = require('./model')

router.use( (err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: "something went wrong inside the recipes router",
        message: err.message,
        stack: err.stack
    })
})

router.get('/', (req, res, next) => {
    Project.getProjects()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    Project.createProject(req.body)
    .then(newProject => {
        let resp = {...newProject, project_completed: newProject.project_completed === 0 ? false : true }
        res.status(200).json(resp)
    })
    .catch(next)
})

module.exports = router