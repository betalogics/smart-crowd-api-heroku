const express = require("express");
const { checkSchema, body } = require("express-validator");
const authorize = require("../../middlewares/authorize");
const verifyToken = require("../../middlewares/verifyToken");
const { USER_ROLES } = require("../../constants/userRoles");
const {
  GetPropertyByIdSchema,
  AddNewPropertySchema,
  DeletePropertyByIdSchema,
  UpdatePropertyByIdSchema,
  CreateResidentialPropertyDetailsSchema,
  GetPropertyWithDetailsByIdSchema,
  AddFinancialsToPropertyByIdSchema,
} = require("./property.dto");
const {
  GetPropertyListing,
  GetPropertyListingById,
  AddNewProperty,
  DeletePropertyById,
  UpdatePropertyById,
  AddDescriptionToProperty,
  GetPropertyWithDetailsByParams,
  AddFinancialsToPropertyById,
  AddImagesToProperty,
} = require("./property.service");
const { multerPropertyImages } = require("../../middlewares/multer");
const router = express.Router();

router.get(
  "/",
  //[verifyToken, authorize([USER_ROLES.ADMIN, USER_ROLES.USER])],
  GetPropertyListing
);

router.get(
  "/:id",
  [
    // checkSchema(GetPropertyByIdSchema),
    // verifyToken,
    // authorize([USER_ROLES.ADMIN, USER_ROLES.USER]),
  ],
  GetPropertyListingById
);

router.post(
  "/add",
  (req,res,next) => {
    console.log("Req runs")
    next()
  },
  [
    checkSchema(AddNewPropertySchema),
    verifyToken,
    authorize([USER_ROLES.ADMIN]),
  ],
  AddNewProperty
);

router.delete(
  "/:id/delete/",
  [
    checkSchema(DeletePropertyByIdSchema),
    verifyToken,
    authorize([USER_ROLES.ADMIN]),
  ],
  DeletePropertyById
);

router.patch(
  "/:id/edit/",
  [
    verifyToken,
    authorize([USER_ROLES.ADMIN]),
    checkSchema(UpdatePropertyByIdSchema),
  ],
  UpdatePropertyById
);

router.post(
  "/:id/add-description/",
  [
    // verifyToken,
    // authorize([USER_ROLES.ADMIN]),
    // checkSchema(CreateResidentialPropertyDetailsSchema),
  ],
  AddDescriptionToProperty
);

router.post(
  "/:id/add-financials/",
  [
    verifyToken,
    authorize([USER_ROLES.ADMIN]),
    checkSchema(AddFinancialsToPropertyByIdSchema),
  ],
  AddFinancialsToPropertyById
);

router.post("/:id/add-images",multerPropertyImages().array('image', 15) , AddImagesToProperty);

router.get(
  "/:id/get-details/",
  [
    // verifyToken,
    // authorize([USER_ROLES.ADMIN, USER_ROLES.USER]),
    // checkSchema(GetPropertyWithDetailsByIdSchema),
  ],
  GetPropertyWithDetailsByParams
);

module.exports = router;
