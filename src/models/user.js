const sqlize = require('../services/sequelize')
const Sequelize = require('sequelize')

const User = sqlize.define('user', {
  name: { type: Sequelize.STRING(255), allowNull: false },
  password: { type: Sequelize.STRING(255), allowNull: false },
  email: {
    type: Sequelize.STRING(255),
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
})
module.exports = User
