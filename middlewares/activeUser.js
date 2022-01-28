const { StatusCodes } = require("http-status-codes");
const { ErrorHandler } = require("../helpers/errorHandler");

function activeUser(request, response, next) {
  try {
    if (!request.activeUser) {
      throw new ErrorHandler(
        StatusCodes.FORBIDDEN,
        "User did not activate their email."
      );
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = activeUser;