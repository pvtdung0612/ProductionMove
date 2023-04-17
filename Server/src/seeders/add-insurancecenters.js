"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("insurancecenters", [
      {
        name: "TTBH Cầu Giấy",
        address: "1 Cầu Giấy - Hà Nội",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TTBH Hồ Tùng Mậu",
        address: "32 Hồ Tùng Mậu - Hà Nội",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TTBH Thanh Xuân",
        address: "260 Thanh Xuân - Hà Nội",
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
