// build your `Task` model here
const db = require('../../data/dbConfig')

async function getTasks() {
    const tasks = await db('tasks')
    return tasks
}

const getById = task_id => {
    return db('tasks').where('task_id', task_id).first() 
  }

async function createTask(task) {
    const [id] = await db('tasks').insert(task)
    return getById(id)
}

module.exports = { 
    getTasks,
    createTask 
}