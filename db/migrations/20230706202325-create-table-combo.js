"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbCombo", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sand: {
        type: Sequelize.BOOLEAN,
      },
      gas: {
        type: Sequelize.BOOLEAN,
      },
      chem: {
        type: Sequelize.BOOLEAN,
      },
      min_pressure: {
        type: Sequelize.FLOAT,
      },
      max_pressure: {
        type: Sequelize.FLOAT,
      },
      min_temperature: {
        type: Sequelize.FLOAT,
      },
      max_temperature: {
        type: Sequelize.FLOAT,
      },
      min_q: {
        type: Sequelize.FLOAT,
      },
      max_q: {
        type: Sequelize.FLOAT,
      },
      min_sand_size: {
        type: Sequelize.FLOAT,
      },
      max_sand_size: {
        type: Sequelize.FLOAT,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbCombo");
  },
};
