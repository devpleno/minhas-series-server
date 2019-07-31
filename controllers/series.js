const axios = require('axios')
const apiKey = '54bc8a90b9ec3f31addef0c092d7c22e'
const getSerieImage = async(name) => {
  try {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=pt-BR&query=${name}&page=1&include_adult=false`
    const res = await axios.get(url)
    return {
      poster: `//image.tmdb.org/t/p/original${res.data.results[0].poster_path}`,
      background: `//image.tmdb.org/t/p/original${res.data.results[0].backdrop_path}`
    }
  } catch (err) {
  }
  return { poster: '', background: '' }
}

const get = ({ db }) => async(req, res) => {
  if (req.params.genre) {
    const series = await db
      .select({
        id: 'series.id',
        name: 'series.name',
        status: 'series.status',
        genre: 'genres.name',
        poster: 'series.poster',
        background: 'series.background'
      })
      .from('series')
      .leftJoin('genres', 'genres.id', 'series.genre_id')
    res.send({
      data: series,
      pagination: {
        message: 'soon :)'
      }
    })
  } else {
    const series = await db
      .select({
        id: 'series.id',
        name: 'series.name',
        status: 'series.status',
        genre: 'genres.name',
        poster: 'series.poster',
        background: 'series.background'
      })
      .from('series')
      .leftJoin('genres', 'genres.id', 'series.genre_id')
    res.send({
      data: series,
      pagination: {
        message: 'soon :)'
      }
    })
  }
}

const create = ({ db }) => async(req, res) => {
  const newSerie = req.body

  const images = await getSerieImage(newSerie.name)

  const serieToInsert = {
    name: newSerie.name,
    status: newSerie.status,
    genre_id: newSerie.genre_id,
    poster: images.poster,
    background: images.background
  }

  const [insertedId] = await db.insert(serieToInsert).into('series')
  serieToInsert.id = insertedId
  res.send(serieToInsert)
}

const getOne = ({ db }) => async(req, res) => {
  let id = req.params.id
  const serie = await db('series')
    .select({
      id: 'series.id',
      name: 'series.name',
      status: 'series.status',
      genre: 'genres.name',
      poster: 'series.poster',
      background: 'series.background'
    })
    .where('series.id', id)
    .leftJoin('genres', 'genres.id', 'series.genre_id')
    .first()
  res.send(serie)
}

const remove = ({ db }) => async(req, res) => {
  const { id } = req.params
  const serie = await db('series').select().where('id', id)
  if (serie.length === 0) {
    res.status(401)
    res.send({ error: true })
  } else {
    await db('series').select().where('id', id).del()
    res.send({ success: true })
  }
}

const update = ({ db }) => async(req, res) => {
  const updatedSerie = req.body
  let { id } = req.params

  const serie = await db('series').select().where('id', id)
  if (serie.length === 0) {
    res.status(401)
    return res.send({ error: true })
  }

  const images = await getSerieImage(updatedSerie.name)

  const serieToUpdate = {
    name: updatedSerie.name,
    status: updatedSerie.status,
    genre_id: updatedSerie.genre_id,
    comments: updatedSerie.comments,
    poster: images.poster,
    background: images.background
  }

  await db('series')
    .where('id', id)
    .update(serieToUpdate)

  res.send(serieToUpdate)
}

module.exports = { get, getOne, remove, create, update }
