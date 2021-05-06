module.exports = (sequelize, Sequelize) => {
  const Participation = sequelize.define('participation', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    raffle_id: {
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.INTEGER
    },
    reg_date: {
      type: Sequelize.DATE
    },
    successHash: {
      type: Sequelize.STRING
    }
  })

  return Participation
}
