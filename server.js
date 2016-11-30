const Hapi = require('hapi')

const PORT = process.env.NODE_ENV === 'production' ? 6011 : 6010

const server = new Hapi.Server()
server.connection({ port: PORT })

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!')
  }
})

server.start((err) => {
  if (err) {
    throw err
  }
  console.log(`Server running at: ${server.info.uri}`)
})
