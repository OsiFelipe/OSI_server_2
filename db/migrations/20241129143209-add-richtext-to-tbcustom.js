"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the new field to the `tbProduct` table
    await queryInterface.addColumn("tbCustomTool", "toolRichText", {
      type: Sequelize.TEXT, // Adjust the type as needed (e.g., INTEGER, DATE, etc.)
      allowNull: true, // Specify whether the field can be null
      defaultValue: null, // Optional: Set a default value
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the field in case of rollback
    await queryInterface.removeColumn("tbCustomTool", "toolRichText");
  },
};
