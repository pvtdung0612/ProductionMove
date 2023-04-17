"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("customers", [
      {
        name: "N.A",
        sdt: "0123456789",
        email: "dungn8979@gmail.com",
        address: "34 Đ.Cầu Giấy - Cầu Giấy - Hà Nội",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "H.B",
        sdt: "0123456788",
        email: "pvtdung0612@gmail.com",
        address: "5 Đ.Hồ Tùng Mậu - Cầu Giấy - Hà Nội",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "P.C",
        sdt: "0123456787",
        email: "dungnnn8979@gmail.com",
        address: "280 Đ.Nguyễn Trãi - Thanh Xuân - Hà Nội",
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
