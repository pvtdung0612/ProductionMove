"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("factories", [
      {
        name: "Nhà Máy Hà Đông cơ sở 1",
        address: "1 Hà Đông - Hà Nội",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nhà Máy Gia Lâm cơ sở 1",
        address: "1 Gia Lâm - Hà Nội",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nhà Máy Đông Anh cơ sở 1",
        address: "1 Đông Anh - Hà Nội",
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
