const router = require('express').Router()
const db = require('../db')
const dependencies = { db }

const controller = require('../controllers/series')

router.get('/', controller.get(dependencies))
router.get('/:id', controller.getOne(dependencies))
router.post('/', controller.create(dependencies))
router.put('/:id', controller.update(dependencies))
router.delete('/:id', controller.remove(dependencies))

module.exports = router
