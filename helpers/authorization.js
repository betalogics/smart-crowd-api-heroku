const { StatusCodes } = require("http-status-codes");
const { ErrorHandler } = require("./errorHandler");

const authorizedUser = (req, role) => {
  if (!req.userAuthorizationRole) {
    throw new ErrorHandler(
      StatusCodes.UNAUTHORIZED,
      "User not authorized for this route"
    );
  }
  const multipleRoles = Array.isArray(role);
  if (multipleRoles) {
    if (!role.includes(req.userAuthorizationRole)) {
      throw new ErrorHandler(
        StatusCodes.UNAUTHORIZED,
        "User not authorized for this route"
      );
    }
  } else if (req.userAuthorizationRole !== role) {
    throw new ErrorHandler(
      StatusCodes.UNAUTHORIZED,
      "User not authorized for this route"
    );
  }
};

module.exports = { authorizedUser };
