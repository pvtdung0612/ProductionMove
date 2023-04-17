const { Sequelize } = require("sequelize");
require("dotenv").config();

// Option 3: Passing parameters separately (other dialects)
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
    timezone: process.env.DB_TIMEZONE,
  }
);

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;
