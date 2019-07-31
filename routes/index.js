const router = require('express').Router()

const series = require('./series')
const genres = require('./genres')
/*
router.get('/', (req, res) => res.send({
  info: 'Minhas Séries Server',
  datetime: new Date()
}))
*/
const api = require('express').Router()
api.get('/', (req, res) => res.send({
  info: 'Minhas Séries Server',
  datetime: new Date()
}))
api.use('/series', series)
api.use('/genres', genres)

router.use('/api', api)

module.exports = router
