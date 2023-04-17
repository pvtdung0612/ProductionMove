"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sells", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerID: {
        type: Sequelize.INTEGER,
      },
      productID: {
        type: Sequelize.INTEGER,
      },
      sellDate: {
        type: Sequelize.DATE,
      },
      agentID: {
        type: Sequelize.INTEGER,
      },
      insuranceTermEndDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sells");
  },
};
