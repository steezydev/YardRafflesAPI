const Sequelize = require('sequelize')
const { dbConfig } = require("../config/db.config.js")

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false
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
db.admin = require("./admin.model.js")(sequelize, Sequelize);
db.raffle = require("./raffles.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.participation = require("./participation.model.js")(sequelize, Sequelize);
db.blocked = require("./blocked.model.js")(sequelize, Sequelize);

db.announce.belongsToMany(db.tags, {
  through: 'rel_announcements_to_tag',
  foreignKey: "announcements_id",
});

db.tags.belongsToMany(db.announce, {
  through: 'rel_announcements_to_tag',
  foreignKey: "tag_id",
});

db.raffle.belongsToMany(db.tags, {
  through: 'rel_raffles_to_tag',
  foreignKey: "raffle_id",
});

db.tags.belongsToMany(db.raffle, {
  through: 'rel_raffles_to_tag',
  foreignKey: "tag_id",
});

db.raffle.belongsToMany(db.user, {
  through: 'participations',
  foreignKey: "raffle_id",
});

db.user.belongsToMany(db.raffle, {
  through: 'participations',
  foreignKey: "user_id",
});

db.raffle.hasMany(db.participation, { 
  as: "participation" ,
  foreignKey : 'raffle_id'
});

db.raffle.hasMany(db.participation, { 
  as: "participation2" ,
  foreignKey : 'raffle_id'
});

db.user.hasMany(db.participation, { 
  as: "participation" ,
  foreignKey : 'user_id'
});

db.user.hasMany(db.participation, { 
  as: "participation2" ,
  foreignKey : 'user_id'
});

db.user.hasMany(db.blocked, { 
  as: "blocks" ,
  foreignKey : 'user_id'
});



module.exports = db;