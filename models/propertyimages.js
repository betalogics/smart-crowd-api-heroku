"use strict";

const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertyImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ Units, Cart, Description }) {
      // define association here
    }
  }
  PropertyImages.init(
    {
      propertyId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      imageName: {
        allowNull: false,
        type: DataTypes.STRING
      },
    },
    {
      sequelize,
      modelName: "PropertyImages",
      underscored: true,
      tableName: "property_images",
    }
  );
  return PropertyImages;
}