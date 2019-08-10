const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite'
  },
  useNullAsDefault: true
})

const initDB = async () => {
  const seriesExist = await knex.schema.hasTable('series')
  if (!seriesExist) {
    await knex.schema.createTable('series', table => {
      table.increments('id').primary()
      table.string('name')
      table.string('status')
      table.integer('genre_id')
      table.string('comments')
      table.string('poster')
      table.string('background')
    })
  }
  const genresExist = await knex.schema.hasTable('genres')
  if (!genresExist) {
    await knex.schema.createTable('genres', table => {
      table.increments('id').primary()
      table.integer('name')
    })
  }

  const totalGenres = await knex('genres').select(knex.raw('count(*) as total'))
  if (totalGenres[0].total === 0) {
    await knex.insert({
      name: 'Ação'
    }).into('genres')

    await knex.insert({
      name: 'Comédia'
    }).into('genres')

    await knex.insert({
      name: 'La casa de papel',
      status: 'WATCHED',
      genre_id: 1,
      comments: '',
      poster: '//image.tmdb.org/t/p/original/yVUAfbrP5HDJugXraB7KQS0yz6Z.jpg',
      background: '//image.tmdb.org/t/p/original/piuRhGiQBYWgW668eSNJ2ug5uAO.jpg'
    }).into('series')
  }
}

initDB()

module.exports = knex
