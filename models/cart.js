"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Property }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Property, {foreignKey: 'propertyId'});
    }
  }
  Cart.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      units: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      validated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      subTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "cart",
      underscored: true,
      paranoid: true
    }
  );
  return Cart;
};
