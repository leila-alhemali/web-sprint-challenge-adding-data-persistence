// build your `/api/tasks` router here
const router = require('express').Router()
const Task = require('./model')
const Project = require ('../project/model')

router.use( (err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: "something went wrong inside the recipes router",
        message: err.message,
        stack: err.stack
    })
})

router.get('/', (req, res, next) => {
    Task.getTasks()
    .then(task => {
        const project = Project.getProjects()
        .then(projects => {
            return projects.find((proj) => {
                return proj.project_id === task.project_id
             })
        });
        let resp = {
        "task_id": task.task_id,
        "task_description": task.task_description,
        "task_notes": task.task_notes,
        "task_completed": task.task_completed,
        "project_name": project.project_name,
        "project_description": project.project_description
        }
        res.status(200).json(resp)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    Task.createTask(req.body)
    .then(newTask => {
        let resp = {...newTask, task_completed: newTask.task_completed === 0 ? false : true }
        res.status(200).json(resp)
    })
    .catch(next)
})

module.exports = router