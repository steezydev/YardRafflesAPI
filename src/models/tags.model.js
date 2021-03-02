module.exports = (sequelize, Sequelize) => {
  const Tags = sequelize.define("tags", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING
    },
  });

  return Tags;
};