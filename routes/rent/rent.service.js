const model = require("../../models");
const {
  ErrorHandler,
  resolveSchemaValidationResult,
} = require("../../helpers/errorHandler");
const { StatusCodes } = require("http-status-codes");
const { round } = require("../../helpers/maths");
const { sendEmail } = require("../../utils/mailer");
const {
  rentDisbursementAlert,
  rentDisbursementSubject,
} = require("../../constants/emailTemplates");

const getRentListing = (request, response, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const getRentById = (request, response, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const createNewRent = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let Property = await model.Property.findOne({
      where: { id: request.body.propertyId },
      include: { model: model.Units },
      raw: true,
      nest: true,
    });

    if (!Property) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, "Property does not exist.");
    }

    let NewRentBody = {};
    NewRentBody.propertyId = request.body.propertyId;
    NewRentBody.rentAmount = request.body.rentAmount;
    NewRentBody.expenditures = request.body.expenditures;
    NewRentBody.netRentAmount = request.body.netRentAmount;

    let Rent = await model.Rent.create({
      propertyId: NewRentBody.propertyId,
      rentAmount: NewRentBody.rentAmount,
      expenditures: NewRentBody.expenditures,
      netRentAmount: NewRentBody.netRentAmount,
    });

    if (!Rent) {
      throw new ErrorHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong"
      );
    }

    let UsersWhoOwnProperty = await model.UserProperty.findAll({
      where: { propertyId: NewRentBody.propertyId },
      attributes: [],
      include: { model: model.User, attributes: ["id"] },
      raw: true,
      nest: true,
    });

    let UsersWhoOwnPropertyList = UsersWhoOwnProperty.map((Obj) => {
      return { id: Obj.User.id };
    });

    const RENT_PER_UNIT = NewRentBody.netRentAmount / Property.Unit.unitsSold;

    for (let i = 0; i < UsersWhoOwnPropertyList.length; i++) {
      let id = UsersWhoOwnPropertyList[i].id;
      let UserProperty = await model.UserProperty.findOne({
        where: { userId: id, propertyId: NewRentBody.propertyId },
        raw: true,
        nest: true,
      });

      let unitsUserOwns = UserProperty.units;
      let usersRentShare = unitsUserOwns * RENT_PER_UNIT;

      let Wallet = await model.VirtualWallet.findOne({
        where: { userId: id, propertyId: NewRentBody.propertyId },
        raw: true,
        nest: true,
      });

      let previousBalance = Wallet.balance;
      let newBalance = round(previousBalance + usersRentShare);

      let TopUpBalanceInWallet = await model.VirtualWallet.update(
        { balance: newBalance },
        { where: { userId: id, propertyId: NewRentBody.propertyId } }
      );

      let User = await model.User.findOne({
        where: { id },
        raw: true,
        nest: true,
      });

      let emailDetailsConfig = {};
      emailDetailsConfig.to = User.email;
      emailDetailsConfig.subject = rentDisbursementSubject(Property.name);
      emailDetailsConfig.text = rentDisbursementAlert(
        round(usersRentShare),
        NewRentBody.netRentAmount,
        newBalance
      );
      sendEmail(emailDetailsConfig);
    }

    response.status(StatusCodes.CREATED).json({ Message: "Rent Created." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetRentListing: getRentListing,
  GetRentById: getRentById,
  CreateNewRent: createNewRent,
};
