"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Units, Cart, Description, UserProperty, Rent, VirtualWallet, PropertyImages,  }) {
      // define association here
      this.hasOne(Units, {foreignKey: 'propertyId'});
      this.hasMany(Cart, {foreignKey: 'propertyId'});
      this.hasMany(Description, {foreignKey: 'propertyId'});
      this.hasMany(UserProperty, {foreignKey: 'propertyId'});
      this.hasMany(Rent, {foreignKey: 'propertyId'});
      this.hasMany(VirtualWallet, {foreignKey: 'propertyId'});
      this.hasMany(PropertyImages, { foreignKey: "propertyId" })
    }
  }
  Property.init(
    { 
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // address: {
      //   type: DataTypes.STRING,
      //   allowNull: false
      // },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      county: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      countryInitials: {
        type: DataTypes.STRING,
        allowNull: false },
      postCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      class: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      about: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imgThumbnail: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: "Property",
      underscored: true,
      tableName: "property",
    }
  );
  return Property;
};
