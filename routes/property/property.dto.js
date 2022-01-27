const getPropertyByIdParam = {
  id: {
    in: ["params"],
    errorMessage: "Id in params is required.",
    customSanitizer: {
      options: (value) => {
        let sanitizedValue;
        if (parseInt(value)) {
          sanitizedValue = parseInt(value);
        } else {
          sanitizedValue = 1;
        }
        return sanitizedValue;
      },
    },
  },
  // name: {
  //   in: ["query"],
  //   isOptional: true,
  //   isString: true,
  // },
  // limit: {
  //   in: ["query"],
  //   isOptional: true,
  //   isString: true,
  //   toInt: true
  // },
  // page: {
  //   in: ["query"],
  //   isOptional: true,
  //   isString: true,
  //   toInt: true
  // }
};

const deletePropertyIdParam = {
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

const updatePropertyIdParam = {
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
  name: {
    in: ["body"],
    optional: true,
    isLength: {
      errorMessage: "Length of name should be greater than 5 and less than 25",
      options: {
        min: 5,
        max: 25,
      },
    },
    toLowerCase: true,
  },
  type: {
    in: ["body"],
    optional: true,
    errorMessage: "Property Type is required.",
    isLength: {
      errorMessage: "Length of type should be greater than 5 and less than 15",
      options: {
        min: 5,
        max: 15,
      },
    },
    toLowerCase: true,
  },
  size: {
    in: ["body"],
    optional: true,
    isNumeric: true,
    errorMessage: "Size is required.",
  },
  rooms: {
    in: ["body"],
    optional: true,
    isInt: true,
    toInt: true,
    errorMessage: "Number of Rooms are required.",
  },
  stories: {
    in: ["body"],
    optional: true,
    isInt: true,
    toInt: true,
    errorMessage: "Stories are required.",
  },
  latitude: {
    in: ["body"],
    optional: true,
    isNumeric: true,
    errorMessage: "Latitude is required.",
  },
  longitude: {
    in: ["body"],
    optional: true,
    isNumeric: true,
    errorMessage: "Longitude is required.",
  },
};

const addPropertySchema = {
  name: {
    in: ["body"],
    isLength: {
      errorMessage: "Length of name should be greater than 5 and less than 25",
      options: {
        min: 5,
        max: 25,
      },
    },
    toLowerCase: true,
  },
  class: {
    in: ["body"],
    notEmpty: true,
    errorMessage: "Class is required.",
  },
  city: {
    in: ["body"],
    notEmpty: true,
    isLength: {
      errorMessage: "Length of city should be less than 25.",
      options: {
        max: 25,
      },
    },
    toLowerCase: true,
    errorMessage: "City is required.",
  },
  county: {
    in: ["body"],
    notEmpty: true,
    isLength: {
      errorMessage: "Length of county should be less than 25.",
      options: {
        max: 25,
      },
    },
    errorMessage: "County is required.",
  },
  state: {
    in: ["body"],
    notEmpty: true,
    isLength: {
      errorMessage: "Length of state should be less than 25.",
      options: {
        max: 25,
      },
    },
    errorMessage: "State is required.",
  },
  country: {
    in: ["body"],
    notEmpty: true,
    isLength: {
      errorMessage: "Length of country should be less than 25.",
      options: {
        max: 25,
      },
    },
    errorMessage: "Country is required.",
  },
  countryInitials: {
    in: ["body"],
    notEmpty: true,
    isLength: {
      errorMessage: "Length of country initials should be between 2 and 5.",
      options: {
        min: 2,
        max: 5,
      },
    },
    errorMessage: "Country Initials is required.",
  },
  postCode: {
    in: ["body"],
    isInt: true,
    errorMessage: "Postal code is required.",
  },
  units: {
    isInt: ["body"],
    isInt: true,
    errorMessage: "Units of a property are required",
  },
  priceUsd: {
    isInt: ["body"],
    isNumeric: true,
    errorMessage: "Price/Unit is required in USD.",
  },
  latitude: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Latitude is required.",
  },
  longitude: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Longitude is required.",
  },
};

const getPropertyWithDetailsByParam = {
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

const createResidentialPropertyDetails = {
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
  bedroom: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "Bedroom is required",
  },
  bathroom: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "Bathrooms is required",
  },
  garage: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "Garage is required",
  },
  pool: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "Pool is required",
  },
  story: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "Stories is required",
  },
  lotSize: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "lot size is required",
  },
  constructionType: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "construction type is required",
  },
  foundation: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "foundation is required",
  },
  roofType: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "roof type is required",
  },
  parking: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "parking is required",
  },
  interiorSize: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "Interior size is required",
  },
  heating: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "Heating is required",
  },
  cooling: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "Cooling is required",
  },
  furniture: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "Furniture is required",
  },
  appliances: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "Appliances is required",
  },
  propertyType: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "property type is required",
  },
  constructionYear: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "construction year is required",
  },
  neighbourhood: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "neighbourhood is required",
  },
  rentalType: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "rental type is required",
  },
  section8: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    toLowerCase: true,
    errorMessage: "section8 is required",
  },
};

const addFinancialsToPropertyByIdSchema = {
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
  propertyId: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Property Id is required.",
  },
  grossRentPerYear: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Gross Rent/Year is required.",
  },
  grossRentPerMonth: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Gross Rent/Month is required.",
  },
  propertyManagementCharges: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Property Management charges is required.",
  },
  platformCharges: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Platform charges is required.",
  },
  maintenanceCharges: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Maintenance charges is required.",
  },
  propertyTaxCharges: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Property tax charges is required.",
  },
  insuranceCharges: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Insurance charges is required.",
  },
  utilityCharges: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Utility charges is required.",
  },
  netRentPerMonth: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Net Rent/Month is required.",
  },
  netNetPerYear: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Net Rent/Year is required.",
  },
  assetPriceInvestment: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Asset Price (Investment) is required.",
  },
  platformListingFeeInvestment: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Platform listing fee (Investment) is required.",
  },
  initialMaintenanceReserveInvestment: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Initial Maintenance Reserve (Investment) is required.",
  },
  miscellaneousCostsInvestment: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Miscellaneous Costs Investment is required.",
  },
  expectedIncomePercentage: {
    in: ["body"],
    isNumeric: true,
    errorMessage: "Expected Income Percentage is required.",
  },
};

class ResidentialProperty {
  constructor(
    bedroom,
    bathroom,
    garage,
    pool,
    story,
    landSize,
    lotSize,
    constructionType,
    foundation,
    roofType,
    parking,
    interiorSize,
    heating,
    cooling,
    furniture,
    appliances,
    propertyType,
    constructionYear,
    neighbourhood,
    rentalType,
    section8
  ) {
    this.bedroom = bedroom;
    this.bathroom = bathroom;
    this.garage = garage;
    this.pool = pool;
    this.story = story;
    this.landSize = landSize;
    this.lotSize = lotSize;
    this.constructionType = constructionType;
    this.foundation = foundation;
    this.roofType = roofType;
    this.parking = parking;
    this.interiorSize = interiorSize;
    this.heating = heating;
    this.cooling = cooling;
    this.furniture = furniture;
    this.appliances = appliances;
    this.propertyType = propertyType;
    this.constructionYear = constructionYear;
    this.neighbourhood = neighbourhood;
    this.rentalType = rentalType;
    this.section8 = section8;
  }
}

class Financials {
  constructor(
    propertyId,
    grossRentPerYear,
    grossRentPerMonth,
    propertyManagementCharges,
    platformCharges,
    maintenanceCharges,
    propertyTaxCharges,
    insuranceCharges,
    utilityCharges,
    netRentPerMonth,
    netRentPerYear,
    assetPriceInvestment,
    platformListingFeeInvestment,
    initialMaintenanceReserveInvestment,
    miscellaneousCostsInvestment,
    expectedIncomePercentage
  ) {
    this.propertyId = propertyId;
    this.grossRentPerYear = grossRentPerYear;
    this.grossRentPerMonth = grossRentPerMonth;
    this.propertyManagementCharges = propertyManagementCharges;
    this.platformCharges = platformCharges;
    this.maintenanceCharges = maintenanceCharges;
    this.propertyTaxCharges = propertyTaxCharges;
    this.insuranceCharges = insuranceCharges;
    this.utilityCharges = utilityCharges;
    this.netRentPerMonth = netRentPerMonth;
    this.netNetPerYear = netRentPerYear;
    this.assetPriceInvestment = assetPriceInvestment;
    this.platformListingFeeInvestment = platformListingFeeInvestment;
    this.initialMaintenanceReserveInvestment =
      initialMaintenanceReserveInvestment;
    this.miscellaneousCostsInvestment = miscellaneousCostsInvestment;
    this.expectedIncomePercentage = expectedIncomePercentage;
  }
}

class Property {
  constructor() {
    this.name;
    this.class;
    this.county;
    this.state;
    this.country;
    this.countryInitials;
    this.postCode;
    this.latitude;
    this.longitude;
    this.units;
  }
}

const PropertyClassEnum = {
  Residential: "Residential",
};

module.exports = {
  GetPropertyByIdSchema: getPropertyByIdParam,
  AddNewPropertySchema: addPropertySchema,
  DeletePropertyByIdSchema: deletePropertyIdParam,
  UpdatePropertyByIdSchema: updatePropertyIdParam,
  CreateResidentialPropertyDetailsSchema: createResidentialPropertyDetails,
  GetPropertyWithDetailsByIdSchema: getPropertyWithDetailsByParam,
  AddFinancialsToPropertyByIdSchema: addFinancialsToPropertyByIdSchema,

  PropertyClassEnum: PropertyClassEnum,

  Property: Property,
  ResidentialProperty: Object.seal(ResidentialProperty),
  PropertyFinancials: Object.seal(Financials),
};
