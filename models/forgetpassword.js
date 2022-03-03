'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ForgetPassword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Property }) {
      // define association here
    }
  }
  ForgetPassword.init(
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      token: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'forget-password',
      modelName: 'ForgetPassword',
      underscored: true,
      paranoid: true,
    }
  );
  return ForgetPassword;
};
