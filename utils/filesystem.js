var fs = require("fs");
const { StatusCodes } = require("http-status-codes");
const { ErrorHandler } = require("../helpers/errorHandler");

var removeFile = function (filePath) {
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    throw new ErrorHandler(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong."
    );
  }
};

exports.removeFile = removeFile;
