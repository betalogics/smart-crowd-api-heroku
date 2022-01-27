"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TicketResponse extends Model {
    static associate({ User, Ticket }) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId'});
      this.belongsTo(Ticket, {foreignKey: 'ticketId'});
    }
  }
  TicketResponse.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      ticketId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      responseBody: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "TicketResponse",
      underscored: true,
      tableName: "ticket_response",
    }
  );
  return TicketResponse;
};
