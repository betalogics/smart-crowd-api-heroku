const jwt = require("jsonwebtoken");
const models = require("../models");
const { StatusCodes } = require("http-status-codes");
const { ErrorHandler } = require("../helpers/errorHandler");
require("dotenv").config();

async function verifyToken(request, response, next) {
  try {
    let userID = null;
    const token = request.headers["x-access-token"];

    if (!token) {
      throw new ErrorHandler(StatusCodes.FORBIDDEN, "No token provided");
    }

    await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new ErrorHandler(StatusCodes.FORBIDDEN, err.message);
      }
      userID = decoded.id;
    });

    let user = await models.User.findByPk(userID);
    if (!user) {
      throw new ErrorHandler(StatusCodes.FORBIDDEN, "User doesn't Exist");
    }

    request.userAuthorizationRole = user?.dataValues?.role;
    request.userId = userID;
    request.isUserApproved = user?.dataValues?.approved;

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = verifyToken;
