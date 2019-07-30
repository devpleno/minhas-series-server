const app = require('./app')
require('./db')

const port = process.env.API_PORT || 3002

app
  .listen(port, () => {
    console.log('Minhas Séries server running on port', port)
  })
  .on('error', err => {
    console.log('Error running Minhas Séries server')
    console.log(err)
  })
