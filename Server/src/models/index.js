"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let validationDB = {
  dbName: null,
  dbUsername: null,
  dbPassword: null,
};

if (!(process.env.DB_DATABASE_NAME === "")) {
  validationDB.dbName = process.env.DB_DATABASE_NAME;
}
if (!(process.env.DB_USERNAME === "")) {
  validationDB.dbUsername = process.env.DB_USERNAME;
}
if (!(process.env.DB_PASSWORD === "")) {
  validationDB.dbPassword = process.env.DB_PASSWORD;
}

const sequelize = new Sequelize(
  validationDB.dbName,
  validationDB.dbUsername,
  validationDB.dbPassword,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    // query: {
    //   raw: true,
    // },
    timezone: process.env.DB_TIMEZONE,
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
