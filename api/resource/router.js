const router = require('express').Router()
const Resource = require('./model')


router.use( (err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: "something went wrong inside the recipes router",
        message: err.message,
        stack: err.stack
    })
})

// build your `/api/resources` router here
router.get('/', (req, res, next) => {
    Resource.getResources()
    .then(resources => {
        res.status(200).json(resources)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    Resource.createResource(req.body)
    .then(newResource => {
        res.status(200).json(newResource)
    })
    .catch(next)
})

module.exports = router