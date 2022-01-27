const { StatusCodes } = require("http-status-codes");
const { ErrorHandler } = require("../helpers/errorHandler");

function approvedUserRequest(request, response, next) {
  try {
    if (!request.isUserApproved) {
      throw new ErrorHandler(
        StatusCodes.FORBIDDEN,
        "User not approved yet for this service."
      );
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = approvedUserRequest;
