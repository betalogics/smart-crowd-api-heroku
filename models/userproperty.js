"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserProperty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Property, VirtualWallet }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" });
      this.belongsTo(Property, { foreignKey: "propertyId" });
      this.hasOne(VirtualWallet, {foreignKey: "userPropertyId"});
    }
  }
  UserProperty.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      propertyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      units: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "UserProperty",
      tableName: "user_property",
      underscored: true,
      paranoid: true,
    }
  );
  return UserProperty;
};
