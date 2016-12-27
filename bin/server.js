import { Server } from 'hapi'
import inert from 'inert'
import good from 'good'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import React from 'react'
import 'css-modules-require-hook/preset'
import config from '../config'
import createLayoutTemplate from '../src/createLayoutTemplate'
import getTreeTitle from '../src/getTreeTitle'
import routes from '../src/routes'

const PRODUCTION = process.env.NODE_ENV === 'production'
const layoutTemplate = createLayoutTemplate(config.layoutTemplate)

const server = new Server()
server.connection({
  port: config.port
})

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

  // assets route
  server.route({
    method: 'GET',
    path: '/build/{filename*}',
    handler: (request, reply) => {
      if (PRODUCTION) {
        return reply
        .file(`./build/${request.params.filename}`)
      } else {
        return reply
        .redirect(`http://0.0.0.0:${config.assetsDevPort}/build/${request.params.filename}`)
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: function (request, reply) {
      match({ routes, location: request.raw.req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
          console.log('error', request.url, error)
          reply(error.message).code(500)
        } else if (redirectLocation) {
          console.log('info', 'Redirecting', redirectLocation)
          reply.redirect(redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
          console.log('Serving', request.raw.req.url)

          reply(layoutTemplate({
            title: getTreeTitle(config.baseTitle, renderProps.components),
            content: renderToString(<RouterContext {...renderProps} />)
          }))
        } else {
          console.log('Not found', request.raw.req.url)
          reply('Not found').code(404)
        }
      })
    }
  })
})

server.start((err) => {
  if (err) {
    throw err
  }
  console.log(`Server running at: ${server.info.uri}`)
})
