"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate() {
     } 

  }
  Transactions.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      units: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      propertyId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
    },
    {
      sequelize,
      modelName: "Transactions",
      underscored: true,
      tableName: "transactions",
      paranoid: true
    }
  );
  return Transactions;
}