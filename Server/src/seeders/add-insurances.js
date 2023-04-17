"use strict";

/** @type {import('sequelize-cli').Migration} */

let tempEndDate = new Date();
tempEndDate.setDate(tempEndDate.getDate() + 3);

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("insurances", [
      // 1
      {
        insuranceCenterID: 1,
        productID: 2,
        errorReportsID: 1,
        startDate: new Date(),
        endDate: tempEndDate,
        result: "SUCCESS",
        description: "sửa lỗi main hình cho khách",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 2
      {
        insuranceCenterID: 2,
        productID: 6,
        errorReportsID: 2,
        startDate: new Date(),
        endDate: tempEndDate,
        result: "SUCCESS",
        description: "sửa lỗi bàn phím không sử dụng được",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 3
      {
        insuranceCenterID: 3,
        productID: 12,
        errorReportsID: 3,
        startDate: new Date(),
        endDate: tempEndDate,
        result: "SUCCESS",
        description: "sửa lỗi màn hình xanh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 4
      {
        insuranceCenterID: 3,
        productID: 14,
        errorReportsID: 4,
        startDate: new Date(),
        endDate: tempEndDate,
        result: "FAILURE",
        description: "sửa lỗi máy không hoạt động",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 5
      {
        insuranceCenterID: 1,
        productID: 17,
        errorReportsID: 5,
        startDate: new Date(),
        endDate: tempEndDate,
        result: "SUCCESS",
        description: "Khách hàng báo lỗi màn hình không hiển thị",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 6
      {
        insuranceCenterID: 2,
        productID: 21,
        errorReportsID: 6,
        startDate: new Date(),
        endDate: tempEndDate,
        result: "SUCCESS",
        description: "sửa lỗi bàn phím không sử dụng được",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 7
      {
        insuranceCenterID: 3,
        productID: 27,
        errorReportsID: 7,
        startDate: new Date(),
        endDate: tempEndDate,
        result: "SUCCESS",
        description: "sửa lỗi màn hình xanh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 8
      {
        insuranceCenterID: 3,
        productID: 29,
        errorReportsID: 8,
        startDate: new Date(),
        endDate: tempEndDate,
        result: "FAILURE",
        description: "sửa lỗi máy không hoạt động",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 9
      {
        insuranceCenterID: 1,
        productID: 31,
        errorReportsID: 9,
        startDate: new Date(),
        endDate: tempEndDate,
        result: "FAILURE",
        description: "sửa lỗi máy nứt nhẹ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 10
      {
        insuranceCenterID: 1,
        productID: 32,
        errorReportsID: 10,
        startDate: new Date(),
        endDate: tempEndDate,
        result: "FAILURE",
        description: "Khách hàng báo lỗi máy vỡ màn hình, bàn phím, thân máy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 11
      {
        insuranceCenterID: 1,
        productID: 33,
        errorReportsID: 11,
        startDate: new Date(),
        endDate: tempEndDate,
        result: "SUCCESS",
        description: "Khách hàng báo lỗi máy vỡ màn hình, bàn phím, thân máy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 12
      {
        insuranceCenterID: 1,
        productID: 34,
        errorReportsID: 12,
        startDate: new Date(),
        endDate: tempEndDate,
        result: "FAILURE",
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
