const { StatusCodes } = require("http-status-codes");
const { ErrorHandler } = require("../helpers/errorHandler");

async function currentUserRequest(req, res, next) {
  try {
    let idBody = req.body.id;
    let idRequestee = req.userId;
    // if (typeof(idBody) !== Number) {
    //   throw new ErrorHandler(
    //     StatusCodes.BAD_REQUEST,
    //     "Id not provided in correct format."
    //   )
    // }
    if(req.userAuthorizationRole !== 'Admin'){
      if (idBody !== idRequestee) {
        throw new ErrorHandler(
          StatusCodes.FORBIDDEN,
          "User requesting for unauthorized service."
        );
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = currentUserRequest;