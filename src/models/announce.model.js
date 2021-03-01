module.exports = (sequelize, Sequelize) => {
  const Announce = sequelize.define("announcements", {
    title: {
      type: Sequelize.STRING
    },
    work_name: {
      type: Sequelize.STRING
    },
    images: {
      type: Sequelize.TEXT
    },
    message: {
      type: Sequelize.TEXT
    },
    publication_date: {
      type: Sequelize.DATE
    },
  });

  return Announce;
};