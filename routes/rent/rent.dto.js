const createNewRent = {
  propertyId: {
    in: ["body"],
    isInt: true,
    errorMessage: "Property Id is required",
  },
  rentAmount: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Rent Amount is required.",
  },
  expenditures: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Expenditures is required",
  },
  netRentAmount: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Net Rent Amount is required",
  },
};

module.exports = {
  CreateNewRentSchema: createNewRent,
};
