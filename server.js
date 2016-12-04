const Hapi = require('hapi')
const fs = require('fs')

const PRODUCTION = process.env.NODE_ENV === 'production'
const PORT = PRODUCTION ? 6011 : 6010
const LAYOUT_FILE = 'index.html'

const server = new Hapi.Server()
server.connection({ port: PORT })

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    fs.readFile(LAYOUT_FILE, 'utf8', (err, file) => {
      if (err) throw err
      /* eslint-disable no-new-func */
      const template = new Function('o', 'return `' + file + '`')
      /* eslint-enable no-new-func */
      reply(template({
        title: `Tiago's page`,
        content: 'o hello there'
      }))
    })
  }
})

server.route({
    method: 'GET',
    path:'/build/{filename*}',
    handler: (request, reply) => {
        if (PRODUCTION) {
          return reply
          .file(`./build/${request.params.filename}`)
        } else {
          return reply
          .redirect(`http://0.0.0.0:6020/build/${request.params.filename}`)
        }
    }
})


server.start((err) => {
  if (err) {
    throw err
  }
  console.log(`Server running at: ${server.info.uri}`)
})
