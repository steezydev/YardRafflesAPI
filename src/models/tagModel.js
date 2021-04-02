module.exports = (sequelize, Sequelize) => {
  const Tags = sequelize.define("tags", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    itemTitle: {
      type: Sequelize.STRING
    },
  });

  return Tags;
};