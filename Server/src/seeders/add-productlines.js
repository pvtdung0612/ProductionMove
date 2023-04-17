"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("productlines", [
      {
        productLine: "XPS 13 Plus 9320",
        price: "59.490.000₫",
        cpu: "i71260P2.1GHz",
        screen: '13.4"3.5K (3456 x 2160) - OLED',
        description: "Dài 295.3 mm - Rộng 199 mm - Dày 15.28 mm - Nặng 1.26 kg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 2
      {
        productLine: "XPS 13 9320",
        price: "46.590.000₫",
        cpu: "i71260P2.1GHz",
        screen: '13.4"3.5K (3456 x 2160) - OLED',
        description: "Dài 295.3 mm - Rộng 199 mm - Dày 15.28 mm - Nặng 1.26 kg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 3
      {
        productLine: "XPS 13 9310",
        price: "39.990.000₫",
        cpu: "i51135G72.4GHz",
        screen: '13.4"Full HD+ (1920 x 1200)',
        description: "Dài 295 mm - Rộng 198 mm - Dày 14.8 mm - Nặng 1.2 kg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 4
      {
        productLine: "Alienware m15 R6A",
        cpu: "i711800H2.30 GHz",
        price: "61.640.000₫",
        screen: '15.6"QHD (2560 x 1440)240Hz',
        description: "Dài 356 mm - Rộng 272 mm - Dày 19 mm - Nặng 2.69 kg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 5
      {
        productLine: "Alienware m15 R6B",
        price: "61.490.000₫",
        cpu: "i711800H2.30 GHz",
        screen: '15.6"Full HD (1920 x 1080) 165Hz',
        description:
          "Dài 356.2 mm - Rộng 272.5 mm - Dày 19.2 mm - Nặng 2.69 kg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 6
      {
        productLine: "Gaming G15 5515 R5",
        price: "23.090.000₫",
        cpu: "Ryzen 55600H3.3GHz",
        screen: '15.6"Full HD (1920 x 1080) 120Hz',
        description:
          "Dài 357.26 mm - Rộng 272.11 mm - Dày 26.9 mm - Nặng 2.8 kg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 7
      {
        productLine: "Gaming G15 5511",
        price: "25.490.000₫",
        cpu: "Ryzen 55600H3.3GHz",
        screen: '15.6"Full HD (1920 x 1080) 120Hz',
        description: "Dài 357 mm - Rộng 272 mm - Dày 25 mm - Nặng 2.81 kg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 8
      {
        productLine: "Gaming G15 5515 R7",
        price: "27.910.000₫",
        cpu: "Ryzen 75800H3.2GHz",
        screen: '15.6"Full HD (1920 x 1080) 120Hz',
        description: "Dài 357 mm - Rộng 272 mm - Dày 25 mm - Nặng 2.81 kg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 9
      {
        productLine: "Gaming G15 5515 R6",
        price: "20.090.000₫",
        cpu: "Ryzen 55600H3.3GHz",
        screen: '15.6"Full HD (1920 x 1080) 120Hz',
        description:
          "Dài 357.26 mm - Rộng 272.11 mm - Dày 26.9 mm - Nặng 2.8 kg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 10
      {
        productLine: "Inspiron 15 3511",
        price: "12.090.000₫",
        cpu: "i31115G43GHz",
        screen: '15.6"Full HD (1920 x 1080)',
        description: "Dài 358.5 mm - Rộng 235.5 mm - Dày 18.9 mm - Nặng 1.7 kg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 11
      {
        productLine: "Inspiron 16 5620",
        price: "24.690.000₫",
        cpu: "i71255U1.7GHz",
        screen: '16"Full HD+ (1920 x 1200)',
        description:
          "Dài 356.7 mm - Rộng 251.9 mm - Dày 17.95 mm - Nặng 1.87 kg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 12
      {
        productLine: "Vostro 3510",
        price: "19.590.000₫",
        cpu: "i51135G72.4GHz",
        screen: '15.6"Full HD (1920 x 1080)',
        description:
          "Dài 358.5 mm - Rộng 235.5 mm - Dày 18.9 mm - Nặng 1.69 kg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 13
      {
        productLine: "Vostro 5410",
        price: "20.690.000₫",
        cpu: "i511320H3.2GHz",
        screen: '14"Full HD (1920 x 1080)',
        description:
          "Dài 321.2 mm - Rộng 212.8 mm - Dày 17.9 mm - Nặng 1.44 kg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 14
      {
        productLine: "Vostro 5620",
        price: "21.790.000₫",
        cpu: "i51240P1.7GHz",
        screen: '16"Full HD+ (1920 x 1200)',
        description: "Dài 356 mm - Rộng 252 mm - Dày 18 mm - Nặng 1.97 kg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // 15
      {
        productLine: "Latitude 3520",
        price: "22.890.000₫",
        cpu: "i51135G72.4GHz",
        screen: '15.6"Full HD (1920 x 1080)',
        description: "Dài 361 mm - Rộng 240.9 mm - Dày 18 mm - Nặng 1.79 Kg",
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
