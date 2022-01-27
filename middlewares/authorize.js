const { StatusCodes } = require("http-status-codes");
const { ErrorHandler } = require("../helpers/errorHandler");

function authorize(role) {
  return function authorizeByRole(request, response, next) {
    try {
      const multipleRoles = Array.isArray(role);
      if (multipleRoles) {
        if (!role.includes(request.userAuthorizationRole)) {
          throw new ErrorHandler(
            StatusCodes.UNAUTHORIZED,
            "User not authorized for this route"
          );
        }
      } else if (request.userAuthorizationRole !== role) {
        throw new ErrorHandler(
          StatusCodes.UNAUTHORIZED,
          "User not authorized for this route"
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = authorize;
