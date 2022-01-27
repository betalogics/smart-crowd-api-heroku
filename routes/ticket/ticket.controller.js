const express = require("express");
const { checkSchema, body } = require("express-validator");
const authorize = require("../../middlewares/authorize");
const verifyToken = require("../../middlewares/verifyToken");
const currentUserRequest = require("../../middlewares/currentUserRequest");
const approvedUserRequest = require("../../middlewares/approvedUserRequest");
const { USER_ROLES } = require("../../constants/userRoles");
const {
  CreateNewTicketSchema,
  AddCommentToTicketByIdSchema,
  ChangeTicketStatusByIdSchema,
  GetTicketByUserIdSchema,
  GetTicketListingSchema,
  GetTicketByIdSchema,
  DeleteTicketByIdSchema,
} = require("./ticket.dto");
const {
  CreateNewTicket,
  GetTicketById,
  AddCommentToTicketById,
  DeleteTicketById,
  ChangeTicketStatusById,
  GetTicketListing,
} = require("./ticket.service");
const router = express.Router();

router.get(
  "/",
  [
    verifyToken,
    authorize([USER_ROLES.USER, USER_ROLES.ADMIN]),
    checkSchema(GetTicketListingSchema),
  ],
  GetTicketListing
);

router.get(
  "/:ticketid",
  [
    verifyToken,
    approvedUserRequest,
    authorize([USER_ROLES.USER, USER_ROLES.ADMIN]),
    checkSchema(GetTicketByIdSchema),
  ],
  GetTicketById
);

router.post(
  "/create-new-ticket",
  [
    verifyToken,
    authorize([USER_ROLES.USER]),
    currentUserRequest,
    approvedUserRequest,
    checkSchema(CreateNewTicketSchema),
  ],
  CreateNewTicket
);

router.post(
  "/:ticketid/add-comment-to-ticket",
  [
    verifyToken,
    authorize([USER_ROLES.USER, USER_ROLES.ADMIN]),
    currentUserRequest,
    approvedUserRequest,
    checkSchema(AddCommentToTicketByIdSchema),
  ],
  AddCommentToTicketById
);

router.post(
  "/:ticketid/change-status",
  [
    verifyToken,
    authorize([USER_ROLES.ADMIN]),
    checkSchema(ChangeTicketStatusByIdSchema),
  ],
  ChangeTicketStatusById
);

router.delete(
  "/:ticketid",
  [
    verifyToken,
    approvedUserRequest,
    authorize([USER_ROLES.USER]),
    checkSchema(DeleteTicketByIdSchema),
  ],
  DeleteTicketById
);

module.exports = router;
