// build your `Task` model here
const db = require('../../data/dbConfig')

async function getTasks() {
    const tasks = await db('task')
    return tasks
}

const getById = task_id => {
    return db('task').where('task_id', task_id).first() 
  }

async function createTask(task) {
    const [id] = await db('task').insert(task)
    return getById(id)
}

module.exports = { 
    getTasks,
    createTask 
}