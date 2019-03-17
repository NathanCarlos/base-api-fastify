const findUserById = {
  description: 'Rota que retorna as informações de um usuário específico',
  security: [
    {
      ApiKeyAuth: []
    }
  ]
}
const createUser = {
  description: 'Rota para criar um usuário.',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Nome do usuário.' },
      password: { type: 'string', description: 'Senha do usuário.' },
      email: { type: 'string', description: 'Email do usuário.' }
    }
  }
}
const authUser = {
  description: 'Rota para autenticação do usuário.',
  body: {
    type: 'object',
    properties: {
      password: { type: 'string', description: 'Senha do usuário.' },
      email: { type: 'string', description: 'Email do usuário.' }
    }
  }
}
module.exports = {
  findUserById,
  createUser,
  authUser
}
