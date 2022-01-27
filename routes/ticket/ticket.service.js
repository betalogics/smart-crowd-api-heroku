const model = require("../../models");
const { Op } = require("sequelize");
const { StatusCodes } = require("http-status-codes");
const {
  resolveSchemaValidationResult,
  ErrorHandler,
} = require("../../helpers/errorHandler");
const { Ticket, Response } = require("./ticket.dto");

const getTicketListing = async (request, response, next) => {
  try {
    let whereParams = {};
    let like = {};

    if (request.query.user) {
      if (request.userAuthorizationRole !== "Admin") {
        if (request.userId !== request.query.user) {
          response
            .status(StatusCodes.BAD_REQUEST)
            .json({ Message: "User not authorized for the service." });
          return;
        }
      }
      whereParams.userId = request.query.user;
    }

    if (request.query.status) {
      whereParams.ticketStatus = request.query.status;
    }

    if (request.query.title) {
      like.ticketTitle = { [Op.like]: "%" + request.query.title + "%" };
    }

    let Tickets = await model.Ticket.findAll({
      where: { ...whereParams, ...like },
    });

    response.status(StatusCodes.OK).json({
      type: "Ticket",
      data: Tickets,
      apiresponse: true,
    });
  } catch (error) {
    next();
  }
};

const getTicketById = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let Ticket = await model.Ticket.findOne({
      where: { id: request.params.ticketid },
      raw: true,
      nest: true,
    });

    if (!Ticket) {
      throw new ErrorHandler(
        StatusCodes.NOT_FOUND,
        "The ticket does not exist."
      );
    }

    let Comments = await model.TicketResponse.findAll({
      where: { ticketId: request.params.ticketid },
      raw: true,
      nest: true,
    });

    response.status(StatusCodes.OK).json({
      type: "Ticket",
      data: Ticket,
      included: {
        type: "TicketResponse",
        data: Comments,
      },
      apiresponse: true,
    });
  } catch (error) {
    next(error);
  }
};

const createNewTicket = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let ticket = new Ticket(
      request.body.id,
      request.body.ticketTitle,
      request.body.ticketBody
    );

    let CreatedTicket = await model.Ticket.create({
      userId: ticket.userId,
      ticketTitle: ticket.ticketTitle,
      ticketBody: ticket.ticketBody,
    });

    if (!CreatedTicket) {
      throw new ErrorHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to create ticket."
      );
    }

    response.status(StatusCodes.CREATED).json({
      type: "Ticket",
      data: CreatedTicket,
      Message: "Created new ticked.",
      apiresponse: true,
    });
  } catch (error) {
    next(error);
  }
};

const addCommentToTicketById = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let Ticket = await model.Ticket.findOne({
      where: { id: request.params.ticketid },
      raw: true,
      nest: true,
    });

    if (!Ticket) {
      throw new ErrorHandler(
        StatusCodes.NOT_FOUND,
        "Ticket for which comment was made does not exist."
      );
    }

    if (Ticket.ticketStatus === "Closed") {
      throw new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        "Cannot comment on closed ticket."
      );
    }

    if (
      request.userAuthorizationRole !== "Admin" &&
      Ticket.userId !== request.body.id
    ) {
      throw new ErrorHandler(
        StatusCodes.FORBIDDEN,
        "User not authorized to comment."
      );
    }

    let comment = new Response(
      Ticket.id,
      request.body.id,
      request.body.responseBody
    );

    let NewComment = await model.TicketResponse.create({
      ticketId: Ticket.id,
      userId: comment.userId,
      responseBody: comment.responseBody,
    });

    if (!NewComment) {
      throw new ErrorHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Unable to add new comment"
      );
    }

    response.status(StatusCodes.CREATED).json({
      type: "Ticket Response",
      data: NewComment,
      Message: `Added new comment to ticket id ${Ticket.id}`,
      apiresponse: true,
    });
  } catch (error) {
    next(error);
  }
};

const changeTicketStatusById = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let Ticket = await model.Ticket.findOne({
      where: { id: request.params.ticketid },
      raw: true,
      nest: true,
    });

    if (!Ticket) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Ticket does not exist.");
    }

    const Statuses = ["Unresolved", "Resolved", "Closed", "Bummer"];

    if (!Statuses.includes(request.body.status)) {
      throw new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        "Incorrect Status Format."
      );
    }

    let UpdateTicket = await model.Ticket.update(
      { ticketStatus: request.body.status },
      { where: { id: request.params.ticketid } }
    );

    response.status(StatusCodes.CREATED).json({
      Message: `Status updated to ${request.body.status} of ticket id: ${request.params.ticketid}`,
      apiresponse: true,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTicketById = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let TicketExists = await model.Ticket.findOne({
      where: { id: request.params.ticketid },
      raw: true,
      nest: true,
    });

    if (!TicketExists) {
      throw new ErrorHandler(
        StatusCodes.NOT_FOUND,
        "Ticket to delete does not exist"
      );
    }

    if (request.userId !== TicketExists.userId) {
      throw new ErrorHandler(
        StatusCodes.FORBIDDEN,
        "User not allowed to delete this ticket."
      );
    }

    let DeleteTicketsComments = await model.TicketResponse.destroy({
      where: { ticketId: request.params.ticketid },
    });

    let DeleteTicketBody = await model.Ticket.destroy({
      where: { id: request.params.ticketid },
    });

    response.status(StatusCodes.OK).json({
      Message: `Ticket id ${request.params.ticketid} deleted succesfully along with its comments.`,
      apiresponse: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetTicketListing: getTicketListing,
  GetTicketById: getTicketById,
  CreateNewTicket: createNewTicket,
  AddCommentToTicketById: addCommentToTicketById,
  DeleteTicketById: deleteTicketById,
  ChangeTicketStatusById: changeTicketStatusById,
};
