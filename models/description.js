"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Description extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Property}) {
      // define association here
      this.belongsTo(Property, { foreignKey: "propertyId" });
    }

    toJSON() {
      let props = this.get();
      return {
        [props.key]: props.value,
      };
    }
  }
  Description.init(
    {
      propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },  
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "description",
      modelName: "Description",
      underscored: true,
    }
  );
  return Description;
};
