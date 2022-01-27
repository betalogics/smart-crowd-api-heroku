"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate({ User, TicketResponse }) {
      // define association here
      this.hasMany(TicketResponse, {foreignKey: 'ticketId'});
      this.belongsTo(User, {foreignKey: 'userId'});
    }
  }
  Ticket.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      ticketTitle: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ticketBody: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      ticketStatus: {
        allowNull: false,
        type: DataTypes.ENUM("Unresolved", "Resolved", "Closed", "Bummer"),
        defaultValue: "Unresolved",
      },
    },
    {
      sequelize,
      modelName: "Ticket",
      underscored: true,
      tableName: "ticket",
    }
  );
  return Ticket;
};
