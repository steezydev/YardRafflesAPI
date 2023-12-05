"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("raffles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      itemTitle: {
        type: Sequelize.STRING,
      },
      work_name: {
        type: Sequelize.STRING,
      },
      images: {
        type: Sequelize.TEXT,
      },
      message: {
        type: Sequelize.TEXT,
      },
      link: {
        type: Sequelize.TEXT,
      },
      sizes: {
        type: Sequelize.STRING,
      },
      publication_date: {
        type: Sequelize.DATE,
      },
      publish: {
        type: Sequelize.INTEGER,
      },
      close_date: {
        type: Sequelize.DATE,
      },
      results_date: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      profit: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("raffles");
  },
};
