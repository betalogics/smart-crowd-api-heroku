const { StatusCodes } = require("http-status-codes");
const multer = require("multer");
const { ErrorHandler } = require("../helpers/errorHandler");
const models = require("../models");

let NUM = 1;

function multerPropertyImages() {
  const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./assets/properties");
    },
    filename: (req, file, cb) => {
      let extension = file.originalname.split(".")[1]
      let randomNumber = Math.floor(Math.random() * 100000).toString()
      let fileName = randomNumber + "_" + Date.now() + "." + extension
      cb(null, fileName);
      NUM++;
    },
  });

  const upload = multer({
    storage: fileStorageEngine,
    onFileUploadStart: (file) => {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/jpg" &&
        file.mimetype !== "image/png"
      ) {
        return false;
      }
    },
  });
  return upload;
}

function multerKYCDocuments() {
  const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./assets/kyc");
    },
    filename: (req, file, cb) => {
      let extension = file.mimetype.split("/")[1];
      cb(null, Date.now() + "." + extension);
    },
  });

  const upload = multer({
    storage: fileStorageEngine,
    onFileUploadStart: (file) => {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/jpg" &&
        file.mimetype !== "image/png"
      ) {
        return false;
      }
    },
  });
  return upload;
}

module.exports = { multerPropertyImages, multerKYCDocuments };
