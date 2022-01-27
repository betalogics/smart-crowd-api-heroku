"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Financials extends Model {
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
  Financials.init(
    {
      propertyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      grossRentPerYear: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      grossRentPerMonth: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      propertyManagementCharges: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      platformCharges: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      maintenanceCharges: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      propertyTaxCharges: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      insuranceCharges: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      utilityCharges: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      netRentPerMonth: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      netNetPerYear: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      assetPriceInvestment :{
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      platformListingFeeInvestment :{
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      initialMaintenanceReserveInvestment :{
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      miscellaneousCostsInvestment :{
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      expectedIncomePercentage :{
        allowNull: false,
        type: DataTypes.DOUBLE
      },
    },
    {
      sequelize,
      tableName: "financials",
      modelName: "Financials",
      underscored: true,
    }
  );
  return Financials;
};
