const Sequelize = require('sequelize')
const { dbConfig } = require("../config/db.config.js")

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.announce = require("./announce.model.js")(sequelize, Sequelize);

module.exports = db;