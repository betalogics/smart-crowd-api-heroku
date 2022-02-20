const express = require("express");
const { USER_ROLES } = require("../../constants/userRoles");
const { checkSchema } = require("express-validator");
const authorize = require("../../middlewares/authorize");
const verifyToken = require("../../middlewares/verifyToken");
const currentUserRequest = require("../../middlewares/currentUserRequest");
const approvedUserRequest = require("../../middlewares/approvedUserRequest");
const {
  GetCartListing,
  AddUnitsToCart,
  VerifyCartContent,
  RemoveItemFromCart,
  EditItemInCart,
  CheckoutCart,
} = require("./cart.service");
const {
  AddUnitsToCartSchema,
  VerifyCartContentSchema,
  RemoveItemFromCartSchema,
  EditItemsInCartSchema,
} = require("./cart.dto");
const router = express.Router();

router.get("/", [verifyToken, authorize(USER_ROLES.ADMIN)], GetCartListing);

router.post(
  "/add",
  [
    checkSchema(AddUnitsToCartSchema),
    verifyToken,
    authorize(USER_ROLES.USER),
    currentUserRequest,
    approvedUserRequest,
  ],
  AddUnitsToCart
);

router.get(
  "/verify/:id",
  [
    checkSchema(VerifyCartContentSchema),
    verifyToken,
    authorize(USER_ROLES.USER),
    currentUserRequest,
    approvedUserRequest,
  ],
  VerifyCartContent
);

router.post(
  "/:id/checkout/",
  [
    verifyToken,
    authorize([USER_ROLES.USER]),
    currentUserRequest,
    approvedUserRequest,
  ],
  CheckoutCart
);

router.delete(
  "/remove",
  [
    checkSchema(RemoveItemFromCartSchema),
    verifyToken,
    authorize(USER_ROLES.USER),
    currentUserRequest,
    approvedUserRequest,
  ],
  RemoveItemFromCart
);

router.patch(
  "/edit",
  [
    checkSchema(EditItemsInCartSchema),
    verifyToken,
    authorize(USER_ROLES.USER),
    approvedUserRequest,
  ],
  EditItemInCart
);

module.exports = router;
