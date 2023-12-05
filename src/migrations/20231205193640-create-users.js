"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
      },
      balance: {
        type: Sequelize.FLOAT,
      },
      telegramLink: {
        type: Sequelize.STRING,
      },
      telegramId: {
        type: Sequelize.INTEGER,
      },
      parentId: {
        type: Sequelize.INTEGER,
      },
      refHash: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      userRank: {
        type: Sequelize.INTEGER,
      },
      dateRegister: {
        type: Sequelize.DATE,
      },
      accepted: {
        type: Sequelize.INTEGER,
      },
      blocked: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
