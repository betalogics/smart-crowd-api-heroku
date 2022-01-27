const { StatusCodes } = require("http-status-codes");
const {
  resolveSchemaValidationResult,
  ErrorHandler,
} = require("../../helpers/errorHandler");
const model = require("../../models");

//const uuid = require('uuid/');

const getCartListing = (request, response, next) => {
  try {
  } catch (error) {}
};

const addUnitsToCart = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let cartRequestBody = {};
    cartRequestBody.id = request.body.id;
    cartRequestBody.units = request.body.units;
    cartRequestBody.propertyId = request.body.propertyId;

    let requestedPropertyAndUnits = await model.Property.findOne({
      where: { id: cartRequestBody.propertyId },
      include: [{ model: model.Units }],
      raw: true,
      nest: true,
    });

    if (!requestedPropertyAndUnits) {
      throw new ErrorHandler(
        StatusCodes.NOT_FOUND,
        "Requested Property does not exist"
      );
    }

    let itemExistsInCart = await model.Cart.findOne({
      where: {
        userId: cartRequestBody.id,
        propertyId: cartRequestBody.propertyId,
      },
      include: [{ model: model.User }, { model: model.Property }],
      raw: true,
      nest: true,
    });

    let validateRequestedUnits = itemExistsInCart
      ? itemExistsInCart.units + cartRequestBody.units <=
        requestedPropertyAndUnits.Unit.unitsRemaining
        ? true
        : false
      : requestedPropertyAndUnits.Unit.unitsRemaining >= cartRequestBody.units
      ? true
      : false;

    if (!validateRequestedUnits) {
      throw new ErrorHandler(
        StatusCodes.NOT_ACCEPTABLE,
        "Requested units cannot be processed"
      );
    }

    if (itemExistsInCart) {
      let updateExistingCartItem = await model.Cart.update(
        {
          units: cartRequestBody.units + itemExistsInCart.units,
          subTotal:
            requestedPropertyAndUnits.Unit.priceUsd *
            (cartRequestBody.units + itemExistsInCart.units),
        },
        {
          where: {
            userId: itemExistsInCart.userId,
            propertyId: itemExistsInCart.propertyId,
          },
        }
      );

      if (!updateExistingCartItem) {
        throw new ErrorHandler(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Something went wrong."
        );
      }

      response
        .status(StatusCodes.CREATED)
        .json({ Message: "Updated the item in cart" });
      return;
    } else {
      let addItemToCart = await model.Cart.create({
        userId: cartRequestBody.id,
        propertyId: cartRequestBody.propertyId,
        units: cartRequestBody.units,
        subTotal:
          requestedPropertyAndUnits.Unit.priceUsd * cartRequestBody.units,
      });

      response
        .status(StatusCodes.CREATED)
        .json({ Message: "Added item to the cart", apiresponse: true });
    }
  } catch (error) {
    next(error);
  }
};

const verifyCartContent = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    const userId = request.params.id;

    let cart = await model.Cart.findAll({
      where: { userId: userId },
      include: [
        {
          model: model.User,
          attributes: {
            exclude: [
              "password",
              "salt",
              "role",
              "isUsCitizen",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: model.Property,
          attributes: { exclude: ["createdAt", "updatedAt", "validated"] },
        },
      ],
      raw: true,
      nest: true,
    });

    if (!cart) {
      throw new ErrorHandler(
        StatusCodes.NOT_FOUND,
        "No items found in the cart"
      );
    }

    let ValidateCart = await model.Cart.update(
      { validated: true },
      { where: { userId } }
    );

    if (!ValidateCart) {
      throw new ErrorHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong."
      );
    }

    response.status(StatusCodes.OK).json({
      type: "Cart",
      userId: userId,
      data: {
        ...cart,
      },
      Message: "Cart items validated for checkout.",
      apiresponse: true
    });
  } catch (error) {
    next();
  }
};

const checkoutCart = async (request, response, next) => {
  try {
    // const {product, token} = request.body;
    // const idempotencyKey = uuid();
  } catch (error) {
    next(error);
  }
};

const removeItemFromCart = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let deleteCartItemRequest = {};
    deleteCartItemRequest.userId = request.body.id;
    deleteCartItemRequest.propertyId = request.body.propertyId;

    let checkItemInCart = await model.Cart.findOne({
      where: {
        userId: deleteCartItemRequest.userId,
        propertyId: deleteCartItemRequest.propertyId,
      },
      raw: true,
    });

    if (!checkItemInCart) {
      throw new ErrorHandler(
        StatusCodes.NOT_FOUND,
        "The item requested to be deleted does not exist"
      );
    }

    let InvalidateCart = await model.Cart.update(
      { validated: false },
      {
        where: {
          userId: deleteCartItemRequest.userId,
          propertyId: deleteCartItemRequest.propertyId,
        },
      }
    );

    if (!InvalidateCart) {
      throw new ErrorHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong"
      );
    }

    let deleteItemFromCart = await model.Cart.destroy({
      where: {
        userId: deleteCartItemRequest.userId,
        propertyId: deleteCartItemRequest.propertyId,
      },
    });

    if (!deleteItemFromCart) {
      throw new ErrorHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong"
      );
    }

    response
      .status(StatusCodes.OK)
      .json({ Message: "Item deleted successfully", apiresponse: true });
  } catch (error) {
    next(error);
  }
};

const editItemInCart = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let editItemInCartRequest = {};
    editItemInCartRequest.userId = request.body.id;
    editItemInCartRequest.units = request.body.units;
    editItemInCartRequest.propertyId = request.body.propertyId;

    let requestedPropertyAndUnits = await model.Property.findOne({
      where: { id: editItemInCartRequest.propertyId },
      include: [{ model: model.Units }],
      raw: true,
      nest: true,
    });

    if (!requestedPropertyAndUnits) {
      response
        .status(StatusCodes.NOT_FOUND)
        .json({ apiresponse: 0, Message: "Property does not exist." });
    }

    editItemInCartRequest.subTotal =
      requestedPropertyAndUnits.Unit.priceUsd * editItemInCartRequest.units;

    let checkItemInCart = await model.Cart.findOne({
      where: {
        userId: editItemInCartRequest.userId,
        propertyId: editItemInCartRequest.propertyId,
      },
      include: [
        {
          model: model.Property,
          as: "Property",
          include: [{ model: model.Units }],
        },
      ],
      raw: true,
      nest: true,
    });

    if (!checkItemInCart) {
      throw new ErrorHandler(
        StatusCodes.NOT_FOUND,
        "Item does not exit in cart."
      );
    }

    let validateEditUnits =
      editItemInCartRequest.units <=
      checkItemInCart.Property.Unit.unitsRemaining
        ? true
        : false;

    if (!validateEditUnits) {
      throw new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        "Units cannot be processed."
      );
    }

    let editCartItem = await model.Cart.update(
      {
        units: editItemInCartRequest.units,
        subTotal: editItemInCartRequest.subTotal,
      },
      {
        where: {
          userId: editItemInCartRequest.userId,
          propertyId: editItemInCartRequest.propertyId,
        },
      }
    );

    if (!editCartItem) {
      throw new ErrorHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong"
      );
    }

    response
      .status(StatusCodes.CREATED)
      .json({ Message: "Updated the contents of cart.", apiresponse: true });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetCartListing: getCartListing,
  AddUnitsToCart: addUnitsToCart,
  VerifyCartContent: verifyCartContent,
  CheckoutCart: checkoutCart,
  RemoveItemFromCart: removeItemFromCart,
  EditItemInCart: editItemInCart,
};
