"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("sells", [
      // 1
      {
        customerID: 1,
        productID: 1,
        sellDate: new Date("2022-11-20"),
        agentID: 1,
        insuranceTermEndDate: new Date("2023-5-20"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 2
      {
        customerID: 2,
        productID: 16,
        sellDate: new Date("2022-11-15"),
        agentID: 1,
        insuranceTermEndDate: new Date("2023-5-15"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 3
      {
        customerID: 1,
        productID: 2,
        sellDate: new Date("2022-12-26"),
        agentID: 1,
        insuranceTermEndDate: new Date("2023-6-26"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 4
      {
        customerID: 2,
        productID: 6,
        sellDate: new Date("2022-12-29"),
        agentID: 2,
        insuranceTermEndDate: new Date("2023-6-29"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 5
      {
        customerID: 3,
        productID: 12,
        sellDate: new Date("2022-1-29"),
        agentID: 3,
        insuranceTermEndDate: new Date("2023-7-29"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 6
      {
        customerID: 3,
        productID: 14,
        sellDate: new Date("2022-3-29"),
        agentID: 3,
        insuranceTermEndDate: new Date("2023-9-29"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 7
      {
        customerID: 1,
        productID: 17,
        sellDate: new Date("2022-6-30"),
        agentID: 1,
        insuranceTermEndDate: new Date("2023-12-30"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 8
      {
        customerID: 2,
        productID: 21,
        sellDate: new Date("2022-6-30"),
        agentID: 2,
        insuranceTermEndDate: new Date("2023-12-30"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 9
      {
        customerID: 3,
        productID: 27,
        sellDate: new Date("2022-6-30"),
        agentID: 3,
        insuranceTermEndDate: new Date("2022-12-30"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 10
      {
        customerID: 3,
        productID: 29,
        sellDate: new Date("2022-6-30"),
        agentID: 3,
        insuranceTermEndDate: new Date("2022-12-30"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 11
      {
        customerID: 1,
        productID: 31,
        sellDate: new Date("2022-6-30"),
        agentID: 1,
        insuranceTermEndDate: new Date("2022-12-30"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 12
      {
        customerID: 1,
        productID: 32,
        sellDate: new Date("2022-6-30"),
        agentID: 1,
        insuranceTermEndDate: new Date("2022-12-30"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 12
      {
        customerID: 1,
        productID: 33,
        sellDate: new Date("2022-12-27"),
        agentID: 1,
        insuranceTermEndDate: new Date("2023-6-27"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 12
      {
        customerID: 1,
        productID: 34,
        sellDate: new Date("2022-12-30"),
        agentID: 1,
        insuranceTermEndDate: new Date("2023-6-30"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
