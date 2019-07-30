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
    })
  }
  const genresExist = await knex.schema.hasTable('genres')
  if (!genresExist) {
    await knex.schema.createTable('genres', table => {
      table.increments('id').primary()
      table.integer('name')
    })
  }
/*
  const totalUsers = await knex('users').select(knex.raw('count(*) as total'))
  if (totalUsers[0].total === 0) {
    await knex.insert({
      name: 'Tulio Faria',
      email: 'tuliofaria@devpleno.com',
      passwd: 'abc123',
      role: 'admin',
      unit: 'metric',
      timezone: 'America/Sao_Paulo'
    }).into('users')
    await knex.insert({
      name: 'Zé da Silva',
      email: 'ze@dominio.com',
      passwd: 'abc123',
      role: 'user',
      unit: 'metric',
      timezone: 'America/Sao_Paulo'
    }).into('users')
  }*/
}

initDB()

module.exports = knex
