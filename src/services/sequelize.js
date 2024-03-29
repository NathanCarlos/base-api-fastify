const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  'yourdatabase',
  'yourusername',
  'yourpassword',
  {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
  }
)
sequelize.sync()

module.exports = sequelize
