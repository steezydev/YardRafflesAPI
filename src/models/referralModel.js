module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('referrals', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    parentId: {
      type: Sequelize.INTEGER,
    },
    childId: {
      type: Sequelize.INTEGER,
    },
  })

  return User
}
