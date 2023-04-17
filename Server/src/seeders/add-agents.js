"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("agents", [
      {
        name: "Đại lý DellCorp Cầu Giấy",
        address: "32 Đ.Cầu Giấy - Cầu Giấy - Hà Nội",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Đại lý DellCorp Hồ Tùng Mậu",
        address: "1 Đ.Hồ Tùng Mậu - Cầu Giấy - Hà Nội",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Đại lý DellCorp Thanh Xuân",
        address: "260 Đ.Nguyễn Trãi - Thanh Xuân - Hà Nội",
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
