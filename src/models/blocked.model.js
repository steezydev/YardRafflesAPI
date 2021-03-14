module.exports = (sequelize, Sequelize) => {
  const Blocked = sequelize.define("blocked_users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    admin_blocking: {
      type: Sequelize.INTEGER
    },
    reason: {
      type: Sequelize.STRING,
    },
    unblocked: {
      type: Sequelize.INTEGER
    },
  });

  return Blocked;
};