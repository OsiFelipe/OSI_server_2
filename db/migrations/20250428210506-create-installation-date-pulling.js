"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("tbPulling", "installationDate", {
      type: Sequelize.DATE, // Adjust the type as needed (e.g., INTEGER, DATE, etc.)
      allowNull: true, // Specify whether the field can be null
      defaultValue: null, // Optional: Set a default value
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("tbPulling", "installationDate");
  },
};
