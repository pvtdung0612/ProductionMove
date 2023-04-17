"use strict";

let aryPasswordDefault = [
  "U2FsdGVkX18/MtoKuvpcmLUDrn45XJMGsTncLhtHUY8=", //dung1
  "U2FsdGVkX1/lrXwLKGDORYQlEMzHWCB0nq9Vd5mbsV8=", //kha1
  "U2FsdGVkX1+lfvauwyXAyl4ayc3NTIkxLGOlQU6THLU=", //quang1
  "U2FsdGVkX1/OLngtbmi4x09hIuhs7Shi6cB4opaxGVg=", //dungAgent1
  "U2FsdGVkX1/PBdf6F0+rW4s1lRJeYQvolNItYUEUTTA=", //quangAgent1
  "U2FsdGVkX189VXLsN9Cg5Tj00VtOO4C5k+mpZrzhZ7A=", //khaAgent1
  "U2FsdGVkX19rZ4nEi4lsD10RtQuHgLaBfK3Hsmhd6cA=", //dungFactory1
  "U2FsdGVkX18i4qwu93HZ+fe6xXb0BKWs5+iZEGb/umM=", //quangFactory1
  "U2FsdGVkX19Ms8LPCtxxRxMlJmf6HwMK+7N9HO0iba8=", //khaFactory1
  "U2FsdGVkX1/xafNtnlsHnAaXOhOT8CESLU9yRKow0mPBcu5bzv7ksFBifQWRyifm", //dungInsuranceory1
  "U2FsdGVkX19stdjLCDifwo/00FxhkE+rXMM4txLs69c=", //quangInsurance1
  "U2FsdGVkX1+5hYGd76T7y7jawe2/I3h4wHfA1ljHbMQ=", //khaInsurance1
];

// import cryptoJS from "./utils/cryptoJS"
// let aryPasswordDefault = [
//   cryptoJS.encrypt("dung1"), //dung
//   cryptoJS.encrypt("kha1"), //kha
//   cryptoJS.encrypt("quang1"), //quang
//   cryptoJS.encrypt("dungAgent1"), //dungAgent
//   cryptoJS.encrypt("quangAgent1"), //quangAgent
//   cryptoJS.encrypt("khaAgent1"), //khaAgent
//   cryptoJS.encrypt("dungFactory1"), //dungFactory
//   cryptoJS.encrypt("quangFactory1"), //quangFactory
//   cryptoJS.encrypt("khaFactory1"), //khaFactory
//   cryptoJS.encrypt("dungInsuranceory1"), //dungInsuranceory
//   cryptoJS.encrypt("quangInsurance1"), //quangInsurance
//   cryptoJS.encrypt("khaInsurance1"), //khaInsurance
// ];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("accounts", [
      {
        username: "dung1",
        password: aryPasswordDefault[0],
        roleKey: "R1",
        workplaceID: 1,
        image: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "kha1",
        password: aryPasswordDefault[1],
        roleKey: "R1",
        workplaceID: 1,
        image: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "quang1",
        password: aryPasswordDefault[2],
        roleKey: "R1",
        workplaceID: 1,
        image: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "dungAgent1",
        password: aryPasswordDefault[3],
        roleKey: "R3",
        workplaceID: 1,
        image: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "quangAgent1",
        password: aryPasswordDefault[4],
        roleKey: "R3",
        workplaceID: 2,
        image: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "khaAgent1",
        password: aryPasswordDefault[5],
        roleKey: "R3",
        workplaceID: 3,
        image: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "dungFactory1",
        password: aryPasswordDefault[6],
        roleKey: "R2",
        workplaceID: 1,
        image: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "quangFactory1",
        password: aryPasswordDefault[7],
        roleKey: "R2",
        workplaceID: 2,
        image: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "khaFactory1",
        password: aryPasswordDefault[8],
        roleKey: "R2",
        workplaceID: 3,
        image: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "dungInsurance1",
        password: aryPasswordDefault[9],
        roleKey: "R4",
        workplaceID: 1,
        image: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "quangInsurance1",
        password: aryPasswordDefault[10],
        roleKey: "R4",
        workplaceID: 2,
        image: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "khaInsurance1",
        password: aryPasswordDefault[11],
        roleKey: "R4",
        workplaceID: 3,
        image: "",
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
