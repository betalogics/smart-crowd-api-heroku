"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Property, RentDisbursement }) {
      // define association here
      this.belongsTo(Property, { foreignKey: "propertyId" });
      this.hasMany(RentDisbursement, {foreignKey: "rentId"});
    }
  }
  Rent.init(
    {
      propertyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      rentAmount: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      expenditures: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      netRentAmount: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
    },
    {
      sequelize,
      modelName: "Rent",
      tableName: "rent",
      underscored: true,
      paranoid: true,
    }
  );
  return Rent;
};
