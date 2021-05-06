module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define('admins', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.TEXT
    }
  })

  return Admin
}
