const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  'announcements',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
  }
)

sequelize
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err))

module.exports = sequelize