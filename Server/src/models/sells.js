"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sell extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sell.init(
    {
      customerID: DataTypes.INTEGER,
      productID: DataTypes.INTEGER,
      sellDate: DataTypes.DATE,
      agentID: DataTypes.INTEGER,
      insuranceTermEndDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Sell",
    }
  );
  return Sell;
};
