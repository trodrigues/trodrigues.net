import { Server } from 'hapi'
import { readFileSync } from 'fs'
import inert from 'inert'
import good from 'good'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import React from 'react'
import routes from './src/routes'

const PRODUCTION = process.env.NODE_ENV === 'production'
const PORT = PRODUCTION ? 6011 : 6010
const LAYOUT_FILE = 'index.html'

const server = new Server()
server.connection({
  port: PORT
})

const layoutFile = readFileSync(LAYOUT_FILE, 'utf8')
/* eslint-disable no-new-func */
const layoutTemplate = new Function('o', 'return `' + layoutFile + '`')
/* eslint-enable no-new-func */

server.register([
  inert,
  {
    register: good,
    options: {
      reporters: {
        consoleReporter: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*' }]
        }, {
          module: 'good-console'
        }, 'stdout']
      }
    }
  }
], (err) => {
  if (err) { throw err }

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      match({ routes, location: request.raw.req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
          console.log('error', request.url, error)
          reply(error.message).code(500)
        } else if (redirectLocation) {
          console.log('info', 'Redirecting', redirectLocation)
          reply.redirect(redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
          console.log('Serving', request.url)

          reply(layoutTemplate({
            title: `Tiago's page`,
            content: renderToString(<RouterContext {...renderProps} />)
          }))
        } else {
          console.log('Not found', request.url)
          reply('Not found').code(404)
        }
      })
    }
  })

  server.route({
    method: 'GET',
    path: '/build/{filename*}',
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
})

server.start((err) => {
  if (err) {
    throw err
  }
  console.log(`Server running at: ${server.info.uri}`)
})
