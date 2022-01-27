const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const authorize = require("../../middlewares/authorize");
const { checkSchema } = require("express-validator");
const router = express.Router();

const {
  RegisterAuthService,
  LoginAuthService,
  MeAuthService,
  RefreshTokenAuthService,
  CreateEmailVerificationRequest,
  CompleteEmailVerificationRequest
} = require("./auth.service");
const {
  RegisterRequestSchema,
  LoginRequestSchema,
  CompleteEmailVerificationRequestSchema,
} = require("./auth.dto");
const { USER_ROLES } = require("../../constants/userRoles");

router.post(
  "/register",
  checkSchema(RegisterRequestSchema),
  RegisterAuthService
);
router.post("/login", checkSchema(LoginRequestSchema), LoginAuthService);

router.post("/refresh", RefreshTokenAuthService);

router.get(
  "/me",
  [verifyToken, authorize([USER_ROLES.USER, USER_ROLES.ADMIN])],
  MeAuthService
);

router.get(
  "/create-email-verification-request",
  [verifyToken, authorize(USER_ROLES.USER)],
  CreateEmailVerificationRequest
);

router.patch(
  "/complete-email-verification-request",
  [
    verifyToken,
    authorize(USER_ROLES.USER),
    checkSchema(CompleteEmailVerificationRequestSchema),
  ],
  CompleteEmailVerificationRequest
);

module.exports = router;
