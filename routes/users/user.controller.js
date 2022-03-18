const express = require('express');
const verifyToken = require('../../middlewares/verifyToken');
const authorize = require('../../middlewares/authorize');
const { USER_ROLES } = require('../../constants/userRoles');
const {
  GetUserListing,
  ApproveUsers,
  GetUserById,
  AddKYCDocumentFront,
  AddKYCDocumentBack,
  GetCartContents,
  GetUnapprovedUserListing,
  GetUserVirtualWallet,
  UpdateUserAttributes,
} = require('./user.service');
const { checkSchema, body } = require('express-validator');
const {
  ApproveUsersSchema,
  GetUserByIdSchema,
  GetUsersCartContentsSchema,
  AddKYCDocumentsSchema,
  GetUserVirtualWalletSchema,
  UpdateUserAttributesSchema,
} = require('./user.dto');
const { multerKYCDocuments } = require('../../middlewares/multer');
const router = express.Router();

router.get('/', [verifyToken, authorize([USER_ROLES.ADMIN])], GetUserListing);

router.get(
  '/get-unapproved-users',
  [verifyToken, authorize(USER_ROLES.ADMIN)],
  GetUnapprovedUserListing
);

router.get(
  '/:id',
  [verifyToken, authorize([USER_ROLES.ADMIN], checkSchema(GetUserByIdSchema))],
  GetUserById
);

router.patch(
  '/:id/approve',
  [verifyToken, authorize([USER_ROLES.ADMIN]), checkSchema(ApproveUsersSchema)],
  ApproveUsers
);

router.get(
  '/:id/get-cart',
  [verifyToken, checkSchema(GetUsersCartContentsSchema)],
  GetCartContents
);

router.post(
  '/add-kyc-front',
  [
    verifyToken,
    authorize(USER_ROLES.USER),
    checkSchema(AddKYCDocumentsSchema),
    multerKYCDocuments().single('kycFront'),
  ],
  AddKYCDocumentFront
);

router.post(
  '/add-kyc-back',
  [
    verifyToken,
    authorize(USER_ROLES.USER),
    checkSchema(AddKYCDocumentsSchema),
    multerKYCDocuments().single('kycBack'),
  ],
  AddKYCDocumentBack
);

router.get(
  '/:id/virtual-wallet',
  [
    verifyToken,
    authorize(USER_ROLES.USER),
    checkSchema(GetUserVirtualWalletSchema),
  ],
  GetUserVirtualWallet
);

router.patch(
  '/:id/update-user',
  [
    verifyToken,
    authorize([USER_ROLES.ADMIN, USER_ROLES.USER]),
    checkSchema(UpdateUserAttributesSchema)
  ],
  UpdateUserAttributes
);

module.exports = router;
