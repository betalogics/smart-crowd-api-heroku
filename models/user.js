"use strict";
const { Model } = require("sequelize");
const { generateSalt, generateSecuredHash } = require("../helpers/security");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cart, Ticket, TicketResponse, UserProperty, EmailVerification }) {
      // define association here
      this.hasMany(Cart, { foreignKey: "userId" });
      this.hasMany(Ticket, { foreignKey: "userId" });
      this.hasMany(TicketResponse, { foreignKey: "userId" });
      this.hasMany(UserProperty, { foreignKey: "userId" });
      this.hasOne(EmailVerification, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("Admin", "Customer"),
        allowNull: true,
        defaultValue: "Customer",
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      isUsCitizen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      kycFrontImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      kycBackImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
      tableName: "users",

      hooks: {
        beforeValidate: (user, options) => {
          if (user.changed("password")) {
            user.salt = generateSalt();
            user.password = generateSecuredHash(user.password, user.salt);
          }
        },
      },
    }
  );

  return User;
};
