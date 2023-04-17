"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      name: DataTypes.TEXT,
      bornDate: DataTypes.DATE,
      factoryID: DataTypes.INTEGER,
      agentID: DataTypes.INTEGER,
      insurancecenterID: DataTypes.INTEGER,
      status: DataTypes.TEXT,
      hereRole: DataTypes.STRING,
      hereID: DataTypes.INTEGER,
      productLine: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
