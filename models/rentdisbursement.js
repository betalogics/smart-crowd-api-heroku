"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RentDisbursement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Rent }) {
      // define association here
      this.belongsTo(Rent, {foreignKey: 'rentId'});
    }
  }
  RentDisbursement.init(
    {
      rentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      amount: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
    },
    {
      sequelize,
      modelName: "RentDisbursement",
      tableName: "rent_disbursement",
      underscored: true,
      paranoid: true,
    }
  );
  return RentDisbursement;
};
