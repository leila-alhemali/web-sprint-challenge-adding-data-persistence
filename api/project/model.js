// build your `Project` model here
const db = require('../../data/dbConfig')

async function getProjects() {
    const projects = await db('projects')
    return projects
}

const getById = project_id => {
    return db('projects').where('project_id', project_id).first() 
  }

async function createProject(project) {
    const [id] = await db('projects').insert(project)
    return getById(id)
}

module.exports = { 
    getProjects,
    createProject 
}