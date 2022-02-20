const addUnitsToCartSchema = {
  id: {
    in: ["body"],
    isInt: true,
    toInt: true,
    errorMessage: "Id is required",
  },
  units: {
    in: ["body"],
    isInt: true,
    toInt: true,
    errorMessage: "units are required",
  },
  propertyId: {
    in: ["body"],
    isInt: true,
    toInt: true,
    errorMessage: "property id is required",
  },
};

const verifyCartContentSchema = {
  id: {
    in: ["params"],
    errorMessage: "Id in params is required.",
    customSanitizer: {
      options: (value) => {
        let sanitizedValue;
        if (parseInt(value)) {
          sanitizedValue = parseInt(value);
        } else {
          sanitizedValue = 0;
        }
        return sanitizedValue;
      },
    },
  },
};

const checkoutCartSchema = {
  id: {
    in: ["params"],
    errorMessage: "Id in params is required.",
    customSanitizer: {
      options: (value) => {
        let sanitizedValue;
        if (parseInt(value)) {
          sanitizedValue = parseInt(value);
        } else {
          sanitizedValue = 0;
        }
        return sanitizedValue;
      },
    },
  },
}

const removeItemFromCartSchema = {
  propertyId: {
    in: ["body"],
    isInt: true,
    toInt: true,
    errorMessage: "Property id is required",
  },
};

const editItemsInCartSchema = {
  units: {
    in: ["body"],
    isInt: true,
    toInt: true,
    errorMessage: "units are required",
  },
  propertyId: {
    in: ["body"],
    isInt: true,
    toInt: true,
    errorMessage: "property id is required",
  },
}

module.exports = {
  AddUnitsToCartSchema: addUnitsToCartSchema,
  VerifyCartContentSchema: verifyCartContentSchema,
  RemoveItemFromCartSchema: removeItemFromCartSchema,
  EditItemsInCartSchema: editItemsInCartSchema,
  CheckoutCartSchema: checkoutCartSchema
};
