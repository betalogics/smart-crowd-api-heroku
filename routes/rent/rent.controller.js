const express = require("express");
const { checkSchema, body } = require("express-validator");
const authorize = require("../../middlewares/authorize");
const verifyToken = require("../../middlewares/verifyToken");
const { USER_ROLES } = require("../../constants/userRoles");
const {
  GetRentListing,
  GetRentById,
  CreateNewRent,
} = require("./rent.service");
const { CreateNewRentSchema } = require("./rent.dto");
const router = express.Router();

router.get("/", [verifyToken, authorize(USER_ROLES.ADMIN)], GetRentListing);

router.get("/:rentid", GetRentById);

router.post(
  "/create-rent",
  [
    verifyToken,
    authorize([USER_ROLES.ADMIN, USER_ROLES.USER]),
    checkSchema(CreateNewRentSchema),
  ],
  CreateNewRent
);

module.exports = router;
