const { UserService } = require('../services/index')
const { findUserById, createUser, authUser } = require('../schemas/user-schema')
let response
async function routes (fastify, options) {
  fastify.get(
    '/user/findById',
    { beforeHandler: [fastify.authenticate], schema: findUserById },
    async (request, reply) => {
      try {
        response = await UserService.findById(request.user.id)
        reply.send(response)
      } catch (err) {
        response = {
          error: 'Uncaught server error: ' + JSON.stringify(err)
        }
        let errorCode = 500
        if (err.code != null) {
          errorCode = err.code
        }
        reply.code(errorCode).send(response)
      }
    }
  )
  fastify.post(
    '/user/create',
    { schema: createUser },
    async (request, reply) => {
      try {
        response = await UserService.createUser(
          request.body.name,
          request.body.password,
          request.body.email
        )
        const token = fastify.jwt.sign({ id: response.id })
        response.dataValues.token = token
        reply.status(201).send(response)
      } catch (err) {
        response = {
          error: 'Uncaught server error: ' + JSON.stringify(err)
        }
        let errorCode = 500
        if (err.code != null) {
          errorCode = err.code
        }
        reply.code(errorCode).send(response)
      }
    }
  )
  fastify.post('/user/auth', { schema: authUser }, async (request, reply) => {
    try {
      response = await UserService.authUser(
        request.body.email,
        request.body.password
      )
      const token = fastify.jwt.sign({ id: response.data.id })
      response.token = token
      reply.status(200).send(response)
    } catch (e) {
      reply.status(401).send({
        message: 'Usuario Invalido'
      })
    }
  })
}
module.exports = routes
