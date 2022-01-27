const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const authorize = require("../../middlewares/authorize");
const { USER_ROLES } = require("../../constants/userRoles");
const {
  GetUserListing,
  ApproveUsers,
  GetUserById,
  AddKYCDocumentFront,
  AddKYCDocumentBack,
  GetCartContents,
  GetUnapprovedUserListing,
  GetUserVirtualWallet,
} = require("./user.service");
const { checkSchema } = require("express-validator");
const {
  ApproveUsersSchema,
  GetUserByIdSchema,
  GetUsersCartContentsSchema,
  AddKYCDocumentsSchema,
  GetUserVirtualWalletSchema,
} = require("./user.dto");
const { multerKYCDocuments } = require("../../middlewares/multer");
const router = express.Router();

router.get("/", [verifyToken, authorize([USER_ROLES.ADMIN])], GetUserListing);

router.get(
  "/get-unapproved-users",
  [verifyToken, authorize(USER_ROLES.ADMIN)],
  GetUnapprovedUserListing
);

router.get(
  "/:id",
  [verifyToken, authorize([USER_ROLES.ADMIN], checkSchema(GetUserByIdSchema))],
  GetUserById
);

router.patch(
  "/:id/approve",
  [verifyToken, authorize([USER_ROLES.ADMIN]), checkSchema(ApproveUsersSchema)],
  ApproveUsers
);

router.get(
  "/:id/get-cart",
  [verifyToken, checkSchema(GetUsersCartContentsSchema)],
  GetCartContents
);

router.post(
  "/:id/add-kyc-front",
  [
    verifyToken,
    authorize(USER_ROLES.USER),
    checkSchema(AddKYCDocumentsSchema),
    multerKYCDocuments().single("kycFront"),
  ],
  AddKYCDocumentFront
);

router.post(
  "/:id/add-kyc-back",
  [
    verifyToken,
    authorize(USER_ROLES.USER),
    checkSchema(AddKYCDocumentsSchema),
    multerKYCDocuments().single("kycBack"),
  ],
  AddKYCDocumentBack
);

router.get(
  "/:id/virtual-wallet",
  [
    verifyToken,
    authorize(USER_ROLES.USER),
    checkSchema(GetUserVirtualWalletSchema),
  ],
  GetUserVirtualWallet
);

module.exports = router;
