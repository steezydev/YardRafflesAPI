const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
)

sequelize
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err))

module.exports = sequelize

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.announce = require('./announceModel.js')(sequelize, Sequelize)
db.tags = require('./tagModel.js')(sequelize, Sequelize)
db.admin = require('./adminModel.js')(sequelize, Sequelize)
db.raffle = require('./raffleModel.js')(sequelize, Sequelize)
db.user = require('./userModel.js')(sequelize, Sequelize)
db.participation = require('./participationModel.js')(sequelize, Sequelize)
db.blocked = require('./blockedModel.js')(sequelize, Sequelize)

db.announce.belongsToMany(db.tags, {
  through: 'rel_announcements_to_tag',
  foreignKey: 'announcements_id'
})

db.tags.belongsToMany(db.announce, {
  through: 'rel_announcements_to_tag',
  foreignKey: 'tag_id'
})

db.raffle.belongsToMany(db.tags, {
  through: 'rel_raffles_to_tag',
  foreignKey: 'raffle_id'
})

db.tags.belongsToMany(db.raffle, {
  through: 'rel_raffles_to_tag',
  foreignKey: 'tag_id'
})

db.raffle.belongsToMany(db.user, {
  through: 'participations',
  foreignKey: 'raffle_id'
})

db.user.belongsToMany(db.raffle, {
  through: 'participations',
  foreignKey: 'user_id'
})

db.raffle.hasMany(db.participation, {
  as: 'participation',
  foreignKey: 'raffle_id'
})

db.raffle.hasMany(db.participation, {
  as: 'participation2',
  foreignKey: 'raffle_id'
})

db.user.hasMany(db.participation, {
  as: 'participation',
  foreignKey: 'user_id'
})

db.user.hasMany(db.participation, {
  as: 'participation2',
  foreignKey: 'user_id'
})

db.user.hasMany(db.blocked, {
  as: 'blocks',
  foreignKey: 'user_id'
})

module.exports = db
