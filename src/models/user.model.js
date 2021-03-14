module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING
    },
    balance: {
      type: Sequelize.FLOAT,
    },
    telegram_link: {
      type: Sequelize.INTEGER
    },
    telegram_id: {
      type: Sequelize.INTEGER
    },
    invited_id: {
      type: Sequelize.INTEGER
    },
    phone: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    user_rank: {
      type: Sequelize.INTEGER
    },
    date_register: {
      type: Sequelize.DATE
    },
    accepted: {
      type: Sequelize.INTEGER
    },
    blocked: {
      type: Sequelize.INTEGER
    },
  });

  return User;
};