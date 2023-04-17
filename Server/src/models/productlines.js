"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductLine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductLine.init(
    {
      productLine: DataTypes.STRING,
      price: DataTypes.STRING,
      cpu: DataTypes.STRING,
      screen: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "ProductLine",
    }
  );
  return ProductLine;
};
