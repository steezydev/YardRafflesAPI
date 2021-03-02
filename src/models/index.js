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
db.tags = require("./tags.model.js")(sequelize, Sequelize);

db.announce.belongsToMany(db.tags, {through: 'rel_announcements_to_tag', foreignKey: "announcements_id",});
db.tags.belongsToMany(db.announce, {through: 'rel_announcements_to_tag', foreignKey: "tag_id",},);

module.exports = db;