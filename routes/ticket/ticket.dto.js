const createNewTicket = {
  id: {
    in: ["body"],
    errorMessage: "User Id in body is required.",
    isInt: true,
    toInt: true
  },
  ticketTitle: {
    in: ["body"],
    errorMessage: "Title of ticket is required",
    isString: true,
    isLength: {
      errorMessage: "Length of title should be greater than 3 and less than 40",
      options: {
        min: 5,
        max: 40,
      },
    },
  },
  ticketBody: {
    in: ["body"],
    errorMessage: "Body of ticket is required",
    isString: true,
    isLength: {
      errorMessage:
        "Length of title should be greater than 5 and less than 250",
      options: {
        min: 10,
        max: 250,
      },
    },
  },
};

const addCommentToTicketById = {
  ticketid: {
    in: ["params"],
    errorMessage: "Id in params is required.",
    customSanitizer: {
      options: (value) => {
        let sanitizedValue;
        if (parseInt(value)) {
          sanitizedValue = parseInt(value);
        } else {
          sanitizedValue = 0;
        }
        return sanitizedValue;
      },
    },
  },
  id: {
    in: ["body"],
    errorMessage: "User Id is required",
    isInt: true,
    toInt: true
  },
  responseBody: {
    in: ["body"],
    errorMessage: "response body is required",
    isString: true,
    isLength: {
      errorMessage: "Length of body should be greater than 5 and less than 150",
      options: {
        min: 10,
        max: 150,
      },
    },
  },
};

const changeTicketStatusById = {
  ticketid: {
    in: ["params"],
    errorMessage: "Id in params is required.",
    customSanitizer: {
      options: (value) => {
        let sanitizedValue;
        if (parseInt(value)) {
          sanitizedValue = parseInt(value);
        } else {
          sanitizedValue = 0;
        }
        return sanitizedValue;
      },
    },
  },
  status: {
    in: ["body"],
    isString: true,
    errorMessage: "Status is required.",
  },
};

const getTicketsByUserId = {
  userid: {
    in: ["params"],
    errorMessage: "Id in params is required.",
    customSanitizer: {
      options: (value) => {
        let sanitizedValue;
        if (parseInt(value)) {
          sanitizedValue = parseInt(value);
        } else {
          sanitizedValue = 0;
        }
        return sanitizedValue;
      },
    },
  },
};

const getTicketById = {
  ticketid: {
    in: ["params"],
    errorMessage: "Id in params is required.",
    customSanitizer: {
      options: (value) => {
        let sanitizedValue;
        if (parseInt(value)) {
          sanitizedValue = parseInt(value);
        } else {
          sanitizedValue = 0;
        }
        return sanitizedValue;
      },
    },
  },
};

const deleteTicketById = {
  ticketid: {
    in: ["params"],
    errorMessage: "Id in params is required.",
    customSanitizer: {
      options: (value) => {
        let sanitizedValue;
        if (parseInt(value)) {
          sanitizedValue = parseInt(value);
        } else {
          sanitizedValue = 0;
        }
        return sanitizedValue;
      },
    },
  },
};

const getTicketListing = {
  user: {
    in: ["query"],
    optional: true,
    customSanitizer: {
      options: (value) => {
        let sanitizedValue;
        if (parseInt(value)) {
          sanitizedValue = parseInt(value);
        } else {
          sanitizedValue = 0;
        }
        return sanitizedValue;
      },
    },
  },
  status: {
    in: ["query"],
    optional: true,
    isString: true,
  },
  title: {
    in: ["query"],
    optional: true,
    isString: true,
  },
};

class Ticket {
  constructor(id, ticketTitle, ticketBody) {
    this.userId = id;
    this.ticketTitle = ticketTitle;
    this.ticketBody = ticketBody;
  }
}

class Response {
  constructor(ticketId, userId, responseBody) {
    (this.ticketId = ticketId),
      (this.userId = userId),
      (this.responseBody = responseBody);
  }
}

module.exports = {
  GetTicketListingSchema: getTicketListing,
  CreateNewTicketSchema: createNewTicket,
  AddCommentToTicketByIdSchema: addCommentToTicketById,
  ChangeTicketStatusByIdSchema: changeTicketStatusById,
  GetTicketByUserIdSchema: getTicketsByUserId,
  GetTicketByIdSchema: getTicketById,
  DeleteTicketByIdSchema: deleteTicketById,

  Ticket: Object.seal(Ticket),
  Response: Object.seal(Response),
};
