"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class VirtualWallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Property, UserProperty}) {
      // define association here
      this.belongsTo(Property, {foreignKey: 'propertyId'});
      this.belongsTo(UserProperty, {foreignKey: 'userPropertyId'});
    }
  }
  VirtualWallet.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      propertyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      balance: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      userPropertyId: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: "VirtualWallet",
      underscored: true,
      tableName: "virtual_wallet",
    }
  );
  return VirtualWallet;
};
