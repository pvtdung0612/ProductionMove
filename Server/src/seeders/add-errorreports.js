"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("errorreports", [
      // 1
      {
        customerID: 1,
        productID: 2,
        description: "Khách hàng báo lỗi màn hình không hiển thị",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 2
      {
        customerID: 2,
        productID: 6,
        description: "Khách hàng báo lỗi bàn phím không sử dụng được",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 3
      {
        customerID: 3,
        productID: 12,
        description: "Khách hàng báo lỗi màn hình xanh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 4
      {
        customerID: 3,
        productID: 14,
        description: "Khách hàng báo lỗi máy không hoạt động",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 5
      {
        customerID: 1,
        productID: 17,
        description: "Khách hàng báo lỗi màn hình không hiển thị",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 6
      {
        customerID: 2,
        productID: 21,
        description: "Khách hàng báo lỗi bàn phím không sử dụng được",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 7
      {
        customerID: 3,
        productID: 27,
        description: "Khách hàng báo lỗi màn hình xanh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 8
      {
        customerID: 3,
        productID: 29,
        description: "Khách hàng báo lỗi máy không hoạt động",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 9
      {
        customerID: 1,
        productID: 31,
        description: "Khách hàng báo lỗi máy nứt nhẹ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 10
      {
        customerID: 1,
        productID: 32,
        description: "Khách hàng báo lỗi máy vỡ màn hình, bàn phím, thân máy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 11
      {
        customerID: 1,
        productID: 33,
        description: "Khách hàng báo lỗi máy vỡ màn hình, bàn phím, thân máy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 12
      {
        customerID: 1,
        productID: 34,
        description: "Khách hàng báo lỗi máy vỡ màn hình, bàn phím, thân máy",
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
