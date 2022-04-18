const model = require("../../models");
const { StatusCodes } = require("http-status-codes");

const {
  ErrorHandler,
  resolveSchemaValidationResult,
} = require("../../helpers/errorHandler");
const {
  Property,
  ResidentialProperty,
  PropertyFinancials,
} = require("./property.dto");

require("dotenv").config();
const property = require("../../models/property");
const _removeEmptyProperties = (object) => {
  for (prop in object) {
    if (object[prop] === null || object[prop] === undefined) {
      delete object[prop];
    }
  }
  return object;
};

const getPropertyListing = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let queryParams = {};
    queryParams.name = request.query.name;
    queryParams.limit = request.query.limit;
    queryParams.page = request.query.page;

    const properties = await model.Property.findAll({
      include: [
        {
          model: model.PropertyImages,
          attributes: [
            [model.sequelize.literal("GROUP_CONCAT(image_url)"), "images"],
            "propertyId",
          ],
        },
        {
          model: model.Units,
        },
      ],
      raw: true,
      nest: true,
      group: ["id"],
    });

    const data = properties.map((p) => ({
      ...p,
      PropertyImages: {
        ...p.PropertyImages,
        images: p?.PropertyImages?.images
          ?.split(",")
          .map((image) => ({ source: image })),
      },
      Unit: {
        ...p.Unit,
      },
    }));

    if (!properties) {
      throw new ErrorHandler(
        StatusCodes.NOT_FOUND,
        "No property listing was found."
      );
    }

    response.status(StatusCodes.OK).json({
      type: "Property",
      data: data,
      apiresponse: true,
    });
  } catch (error) {
    next(error);
  }
};

const getPropertyListingById = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let property = await model.Property.findOne({
      where: { id: request.params.id },
      include: [{ model: model.Units }],
      raw: true,
      nest: true,
    });

    if (!property) {
      response.status(StatusCodes.NOT_FOUND).json({
        apiresponse: true,
        Message: "No property exists with the provided Id",
      });
      return;
    }

    let { id } = property;

    const images = await model.PropertyImages.findAll({
      attributes: [
        [model.sequelize.literal("GROUP_CONCAT(image_url)"), "images"],
        "propertyId",
      ],
      where: { propertyId: id },
      raw: true,
      nest: true,
    });

    response.status(StatusCodes.OK).json({
      type: "Property",
      data: {
        type: "property",
        id: id,
        attributes: {
          ...property,
          PropertyImages: {
            images: images[0]?.images
              ?.split(",")
              .map((img) => ({ source: img })),
            propertyId: images[0].propertyId,
          },
        },
      },
      apiresponse: true,
    });
  } catch (error) {
    next(error);
  }
};

const addNewProperty = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    console.log("entered");
    let propertyExists = await model.Property.findOne({
      where: { name: request.body.name },
    });

    if (propertyExists) {
      response
        .status(StatusCodes.CONFLICT)
        .json({ Message: "A property with this name alrady exists." });
      return;
    }

    let createPropertyBody = new Property();

    createPropertyBody.name = request.body.name;
    createPropertyBody.class = request.body.class;
    createPropertyBody.city = request.body.city;
    createPropertyBody.county = request.body.county;
    createPropertyBody.state = request.body.state;
    createPropertyBody.country = request.body.country;
    createPropertyBody.countryInitials = request.body.countryInitials;
    createPropertyBody.postCode = request.body.postCode;
    createPropertyBody.latitude = request.body.latitude;
    createPropertyBody.longitude = request.body.longitude;
    createPropertyBody.units = request.body.units;
    createPropertyBody.about = request.body.about;

    // if (
    //   Object.keys(_removeEmptyProperties(createPropertyBody)).length !==
    //   Object.keys(body).length
    // ) {
    //   throw new ErrorHandler(
    //     StatusCodes.BAD_REQUEST,
    //     "Request Body does not match the schema"
    //   );
    // }

    let { units } = createPropertyBody;

    let propertyCreated = await model.Property.create({
      ...createPropertyBody,
    });

    if (!propertyCreated) {
      throw new ErrorHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong"
      );
    }

    let { id } = propertyCreated;

    let createUnitsBody = {};
    createUnitsBody.unitsQuantity = units;
    createUnitsBody.unitsSold = 0;
    createUnitsBody.unitsRemaining = units;
    createUnitsBody.propertyId = id;
    createUnitsBody.priceUsd = request.body.priceUsd;

    let unitsCreated = await model.Units.create({
      ...createUnitsBody,
    });

    if (!unitsCreated) {
      throw new ErrorHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong"
      );
    }

    response.status(StatusCodes.CREATED).json({
      data: {
        type: "property",
        id: id,
        attributes: {
          ...propertyCreated.dataValues,
        },
        included: [
          {
            type: "units",
            attributes: {
              ...unitsCreated.dataValues,
            },
          },
        ],
      },
      apiresponse: true,
      Message: "Created new Property",
    });
  } catch (error) {
    next(error);
  }
};

const deletePropertyById = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let propertyToDelete = await model.Property.findOne({
      where: { id: request.params.id },
    });
    if (!propertyToDelete) {
      response
        .status(StatusCodes.NOT_FOUND)
        .json({ Message: "Property with this id doesn't exist." });
      return;
    }

    let DeletePropertyListing = await model.Property.destroy({
      where: { id: request.params.id },
    });

    let DeletePropertyFinancials = await model.Financials.destroy({
      where: { propertyId: request.params.id },
    });

    let DeletePropertyDescription = await model.Description.destroy({
      where: { propertyId: request.params.id },
    });

    if (DeletePropertyListing !== 1) {
      throw new ErrorHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Could not delete property listing."
      );
    }

    if (DeletePropertyFinancials !== 1) {
      throw new ErrorHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Could not delete the property's financials."
      );
    }

    if (DeletePropertyDescription !== 1) {
      throw new ErrorHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Could not delete property description."
      );
    }

    response.status(StatusCodes.OK).json({
      apiresponse: true,
      Message: "Deleted Successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const addDescriptionToProperty = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let propertyExist = await model.Property.findByPk(request.params.id);
    if (!propertyExist) {
      throw new ErrorHandler(
        StatusCodes.NOT_FOUND,
        "Property for details, does not exist."
      );
    }

    let descriptionsExist = await model.Description.findOne({
      where: { propertyId: request.params.id },
      raw: true,
      nest: true,
    });

    let CreateNewDescriptionRequest = new ResidentialProperty(
      request.body.bedroom,
      request.body.bathroom,
      request.body.garage,
      request.body.pool,
      request.body.story,
      request.body.landSize,
      request.body.lotSize,
      request.body.constructionType,
      request.body.foundation,
      request.body.roofType,
      request.body.parking,
      request.body.interiorSize,
      request.body.heating,
      request.body.cooling,
      request.body.furniture,
      request.body.appliances,
      request.body.propertyType,
      request.body.constructionYear,
      request.body.neighbourhood,
      request.body.rentalType,
      request.body.section8
    );

    if (descriptionsExist) {
      let updateDescriptionBody = CreateNewDescriptionRequest;
      let deletedDescriptionKeys = model.Description.destroy({
        where: { propertyId: descriptionsExist.propertyId },
      });

      if (!deletedDescriptionKeys) {
        throw new ErrorHandler(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Something went wrong."
        );
      }

      for (const [key, value] of Object.entries(updateDescriptionBody)) {
        let updateOldDescription = await model.Description.create({
          propertyId: descriptionsExist.propertyId,
          key,
          value,
        });
        if (!updateOldDescription) {
          throw new ErrorHandler(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Something went wrong."
          );
        }
      }

      response.status(StatusCodes.CREATED).json({
        apiresponse: true,
        Message: `Update the descripton of property ${descriptionsExist.propertyId}`,
      });

      return;
    }

    for (const [key, value] of Object.entries(CreateNewDescriptionRequest)) {
      let createNewDescription = await model.Description.create({
        propertyId: request.params.id,
        key,
        value,
      });
      if (!createNewDescription) {
        throw new ErrorHandler(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Something went wrong."
        );
      }
    }

    response
      .status(StatusCodes.CREATED)
      .json({ apiresponse: true, Message: "Details of property added." });
  } catch (error) {
    next(error);
  }
};

const addFinancialsToPropertyById = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let Property = await model.Property.findByPk(request.params.id);
    if (!Property) {
      throw new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        "Property requested for financials does not exist"
      );
    }

    let Financial = await model.Financials.findOne({
      where: { propertyId: request.params.id },
    });
    if (Financial) {
      throw new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        "Financials already exist for this property."
      );
    }

    let FinancialsBody = new PropertyFinancials(
      request.body.propertyId,
      request.body.grossRentPerYear,
      request.body.grossRentPerMonth,
      request.body.propertyManagementCharges,
      request.body.platformCharges,
      request.body.maintenanceCharges,
      request.body.propertyTaxCharges,
      request.body.insuranceCharges,
      request.body.utilityCharges,
      request.body.netRentPerMonth,
      request.body.netNetPerYear,
      request.body.assetPriceInvestment,
      request.body.platformListingFeeInvestment,
      request.body.initialMaintenanceReserveInvestment,
      request.body.miscellaneousCostsInvestment,
      request.body.expectedIncomePercentage
    );

    let CreateNewFinancial = await model.Financials.create(FinancialsBody);
    if (!CreateNewFinancial) {
      throw new ErrorHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong"
      );
    }

    response.status(StatusCodes.CREATED).json({
      apiresponse: true,
      Message: `Created new financial for property ${request.params.id}`,
    });
  } catch (error) {
    next(error);
  }
};

const addImagesToProperty = async (request, response, next) => {
  try {
    let filesUploaded = request.files;

    let Property = await model.Property.findOne({
      where: { id: request.params.id },
      raw: true,
      nest: true,
    });

    if (!Property) {
      throw new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        "Property does not exist."
      );
    }

    if (filesUploaded.length == 0) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, "No files were uploaded");
    }

    const updatedProperty = await model.Property.update(
      { imgThumbnail:  process.env.SITE_URL + "/properties/" + filesUploaded[0].filename, },
      { where: { id: Property.id } }
    );

    console.log(JSON.stringify({ updatedProperty }, null, 4));

    for (let i = 0; i < filesUploaded.length; i++) {
      let SavedFileToDB = await model.PropertyImages.create({
        propertyId: request.params.id,
        imageName: filesUploaded[i].filename,
        imageUrl:
          process.env.SITE_URL + "/properties/" + filesUploaded[i].filename,
      });

      if (!SavedFileToDB) {
        throw new ErrorHandler(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Something went wrong"
        );
      }
    }

    response
      .status(StatusCodes.CREATED)
      .json({ apiresponse: true, Message: "Images Uploaded Successfully." });
  } catch (error) {
    next(error);
  }
};

const getPropertyWithDetailsByParam = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let property = await model.Property.findOne({
      where: { id: request.params.id },
      include: [
        {
          model: model.Units,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      raw: true,
      nest: true,
    });

    if (!property) {
      throw new ErrorHandler(
        StatusCodes.NOT_FOUND,
        "Property requested for does not exist."
      );
    }

    let responseBody = {};

    responseBody.type = "Property";
    responseBody.data = {
      ...property,
    };

    let Descriptions = await model.Description.findAll({
      where: { propertyId: property.id },
    });

    if (Descriptions) {
      let descriptionsToJSON = Descriptions.map((description) =>
        description.toJSON()
      );

      let descriptionsNormalized = descriptionsToJSON.reduce(
        (previous, current) => Object.assign(previous, current),
        {}
      );

      responseBody.data.Description = descriptionsNormalized;
    }

    let Financials = await model.Financials.findOne({
      where: { propertyId: property.id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
      nest: true,
    });

    if (Financials) {
      responseBody.data.Financials = Financials;
    }

    let Images = await model.PropertyImages.findAll({
      where: { propertyId: property.id },
      attributes: { exclude: ["id", "propertyId", "createdAt", "updatedAt"] },
      raw: true,
      nest: true,
    });
    let propertyImages = Images.map(
      (image) => process.env.SITE_URL + "/properties/" + image.imageName
    );

    if (propertyImages) {
      responseBody.data.Images = propertyImages;
    }

    responseBody.apiresponse = true;

    response.status(StatusCodes.OK).json(responseBody);
  } catch (error) {
    next(error);
  }
};

const updatePropertyById = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let { id } = request.params;

    let propertyExistsCheck = model.Property.findByPk(id);
    if (!propertyExistsCheck) {
      throw new ErrorHandler(
        StatusCodes.NOT_FOUND,
        "Property with this id does not exist"
      );
    }

    let createPropertyBody = new Property();
    createPropertyBody.name = request.body?.name;
    createPropertyBody.class = request.body?.class;
    createPropertyBody.city = request.body?.city;
    createPropertyBody.county = request.body?.county;
    createPropertyBody.state = request.body?.state;
    createPropertyBody.country = request.body?.country;
    createPropertyBody.countryInitials = request.body?.countryInitials;
    createPropertyBody.postCode = request.body?.postCode;
    createPropertyBody.latitude = request.body?.latitude;
    createPropertyBody.longitude = request.body?.longitude;
    createPropertyBody.units = request.body?.units;

    let updatePropertyBody = _removeEmptyProperties(createPropertyBody);

    let Update = await model.Property.update(
      { ...updatePropertyBody },
      { where: { id } }
    );

    if (!Update) {
      throw new ErrorHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Could not update"
      );
    }

    response
      .status(StatusCodes.CREATED)
      .json({ apiresponse: true, Message: "Update successful." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetPropertyListing: getPropertyListing,
  GetPropertyListingById: getPropertyListingById,
  AddNewProperty: addNewProperty,
  DeletePropertyById: deletePropertyById,
  UpdatePropertyById: updatePropertyById,
  AddDescriptionToProperty: addDescriptionToProperty,
  AddImagesToProperty: addImagesToProperty,
  GetPropertyWithDetailsByParams: getPropertyWithDetailsByParam,
  AddFinancialsToPropertyById: addFinancialsToPropertyById,
};
