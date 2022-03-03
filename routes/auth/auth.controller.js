const express = require('express');
const verifyToken = require('../../middlewares/verifyToken');
const verifyForgetPasswordToken = require('../../middlewares/verifyForgetPasswordToken');
const authorize = require('../../middlewares/authorize');
const { checkSchema, body } = require('express-validator');
const router = express.Router();

const {
  RegisterAuthService,
  LoginAuthService,
  MeAuthService,
  RefreshTokenAuthService,
  CreateEmailVerificationRequest,
  CompleteEmailVerificationRequest,
  ForgetPassword,
  ValidForgetPasswordLink,
  ResetPasswowrd,
} = require('./auth.service');
const {
  RegisterRequestSchema,
  LoginRequestSchema,
  CompleteEmailVerificationRequestSchema,
  ForgetPasswordSchema,
  ValidForgetPasswordRequestSchema,
  ResetPasswordSchema,
} = require('./auth.dto');
const { USER_ROLES } = require('../../constants/userRoles');

router.post(
  '/register',
  checkSchema(RegisterRequestSchema),
  RegisterAuthService
);
router.post('/login', checkSchema(LoginRequestSchema), LoginAuthService);

router.post('/refresh', RefreshTokenAuthService);

router.get(
  '/me',
  [verifyToken, authorize([USER_ROLES.USER, USER_ROLES.ADMIN])],
  MeAuthService
);

router.get(
  '/create-email-verification-request',
  [verifyToken, authorize(USER_ROLES.USER)],
  CreateEmailVerificationRequest
);

router.patch(
  '/complete-email-verification-request',
  [
    verifyToken,
    authorize(USER_ROLES.USER),
    checkSchema(CompleteEmailVerificationRequestSchema),
  ],
  CompleteEmailVerificationRequest
);

router.post(
  '/forget-password',
  checkSchema(ForgetPasswordSchema),
  ForgetPassword
);

router.get(
  '/valid-forget-password-link',
  checkSchema(ValidForgetPasswordRequestSchema),
  ValidForgetPasswordLink
);

router.patch(
  '/reset-password',
  [verifyForgetPasswordToken, checkSchema(ResetPasswordSchema)],
  ResetPasswowrd
);
module.exports = router;
