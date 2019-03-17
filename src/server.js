require('dotenv').config()
const fastify = require('fastify')({ logger: true })
const routes = require('./routes/index')
const port = 8081

fastify.register(require('fastify-cors'))
fastify.register(require('fastify-multipart'))
fastify.register(require('fastify-jwt'), {
  secret: 'K3JDSAU321HJSDAYjsuKDSJA87jdsa3K'
})

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/swagger',
  swagger: {
    info: {
      title: 'OnGest',
      version: '1.0.0'
    },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{ name: 'OnGest-Api', description: 'OnGest-Api documentation.' }],
    securityDefinitions: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization'
      }
    }
  }
})

fastify.decorate('authenticate', async function (request, reply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})

for (const r in routes) {
  fastify.register(routes[r])
}

const start = async () => {
  try {
    fastify.ready(err => {
      if (err) {
        throw err
      }
      fastify.swagger()
    })
    await fastify.listen(port, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
    console.log(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    console.error(err)
    process.exit(1)
  }
}

start()
