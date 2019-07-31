const get = ({ db }) => async(req, res) => {
  const genres = await db
    .select({
      id: 'genres.id',
      name: 'genres.name'
    })
    .from('genres')
  res.send({
    data: genres,
    pagination: {
      message: 'soon :)'
    }
  })
}

const create = ({ db }) => async(req, res) => {
  const newGenre = req.body
  const genreToInsert = {
    name: newGenre.name
  }

  const [insertedId] = await db.insert(genreToInsert).into('genres')
  genreToInsert.id = insertedId
  res.send(genreToInsert)
}

const getOne = ({ db }) => async(req, res) => {
  let id = req.params.id
  const genre = await db('genres').select('*').where('id', id).first()
  res.send(genre)
}

const remove = ({ db }) => async(req, res) => {
  const { id } = req.params
  const genre = await db('genres').select().where('id', id)
  if (genre.length === 0) {
    res.status(401)
    res.send({ error: true })
  } else {
    await db('genres').select().where('id', id).del()
    res.send({ success: true })
  }
}

const update = ({ db }) => async(req, res) => {
  const updatedGenre = req.body
  let { id } = req.params

  const genre = await db('genres').select().where('id', id)
  if (genre.length === 0) {
    res.status(401)
    return res.send({ error: true })
  }

  const genreToUpdate = {
    name: updatedGenre.name
  }

  await db('genres')
    .where('id', id)
    .update(genreToUpdate)

  res.send(genreToUpdate)
}

module.exports = { get, getOne, remove, create, update }
