"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Units extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Property }) {
      // define association here
      this.belongsTo(Property, { foreignKey: "propertyId" });
    }
  }
  Units.init(
    {
      unitsQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unitsSold: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unitsRemaining: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      priceUsd: {
        type: DataTypes.DOUBLE,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: "units",
      modelName: "Units",
      underscored: true,
    }
  );
  return Units;
};
