// build your `Resource` model here
const db = require('../../data/dbConfig')

async function getResources() {
    const resources = await db('resources')
    return resources
}

const getById = resource_id => {
    return db('resources').where('resource_id', resource_id).first() 
  }

async function createResource(resource) {
    const [id] = await db('resources').insert(resource)
    return getById(id)
}

module.exports = { 
    getResources,
    createResource 
}