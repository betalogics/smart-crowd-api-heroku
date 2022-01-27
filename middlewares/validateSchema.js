//const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const { resolveSchemaValidationResult, ErrorHandler } = require("../helpers/errorHandler");
const { validationResult } = require('express-validator');

function validateSchema(req, res, next) {
  try {
    const errors = req.validationResult();
    console.log(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, errors["errors"][0].msg);
    }

    next();
  } catch (error) {
    next();
  }
}

module.exports = validateSchema;
