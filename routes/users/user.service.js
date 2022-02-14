const models = require('../../models');
const { sequelize } = require('../../models');
const { Op } = require('sequelize');
const { StatusCodes } = require('http-status-codes');

const {
  resolveSchemaValidationResult,
  ErrorHandler,
} = require('../../helpers/errorHandler');
const { removeFile } = require('../../utils/filesystem');

require('dotenv').config();

const getUserListing = async (request, response, next) => {
  try {
    const Users = await models.User.findAll({
      attributes: { exclude: ['password', 'salt', 'role', 'active'] },
      raw: true,
      nest: true,
    });

    if (Users.length == 0) {
      Users = [];
    }

    response.status(StatusCodes.OK).json({
      data: Users,
      apiresponse: true,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let User = await models.User.findOne({
      where: { id: request.params.id },
      attributes: { exclude: ['password', 'salt', 'role'] },
      raw: true,
      nest: true,
    });

    if (!User) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, 'User does not exist.');
    }

    response.status(StatusCodes.OK).json({
      type: 'User',
      data: {
        id: User.id,
        firstName: User.firstName,
        lastName: User.lastName,
        email: User.email,
        approved: User.approved,
        isUsCitizen: User.isUsCitizen,
        cryptoWallet: User.wallet,
        kycFrontImage: process.env.SITE_URL + '/kyc/' + User.kycFrontImage,
        kycBackImage: process.env.SITE_URL + '/kyc/' + User.kycBackImage,
        createdAt: User.createdAt,
        updatedAt: User.updatedAt,
      },
      apiresponse: true,
    });
  } catch (error) {
    next(error);
  }
};

const approveUsers = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let User = await models.User.findOne({ where: { id: request.params.id } });
    if (!User) {
      throw new ErrorHandler(
        StatusCodes.NOT_FOUND,
        'User with this id does not exist'
      );
    }

    let approveUserStatus = await models.User.update(
      { approved: true },
      { where: { id: request.params.id } }
    );

    if (!approveUserStatus) {
      throw new ErrorHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Something went wrong'
      );
    }

    response.status(StatusCodes.OK).json({
      Message: `User number: ${request.params.id} approved`,
      apiresponse: true,
    });
  } catch (error) {
    next(errors);
  }
};

const addKYCDocumentFront = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let KYCDocument = request.file;

    if (request.userId !== request.userId) {
      response.status(StatusCodes.FORBIDDEN).json({
        Message: 'User not authorized for this service.',
        apiresponse: false,
      });
      removeFile(request.file.path);
      return;
    }

    let User = await models.User.findOne({
      where: { id: request.userId },
      raw: true,
      nest: true,
    });

    if (User.kycFrontImage !== null) {
      removeFile('./assets/kyc/' + User.kycFrontImage);
    }

    let UpdateUserKYCFrontDoc = await models.User.update(
      { kycFrontImage: KYCDocument.filename },
      { where: { id: request.userId } }
    );

    if (UpdateUserKYCFrontDoc[0] !== 1) {
      response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ Message: 'Something went wrong', apiresponse: false });
      return;
    }

    response
      .status(StatusCodes.CREATED)
      .json({ Message: 'Added KYC Front Document', apiresponse: true });
  } catch (error) {
    next();
  }
};

const addKYCDocumentBack = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let KYCDocument = request.file;

    if (request.userId !== request.userId) {
      response.status(StatusCodes.FORBIDDEN).json({
        Message: 'User not authorized for this service.',
        apiresponse: false,
      });
      removeFile(request.file.path);
      return;
    }

    let User = await models.User.findOne({
      where: { id: request.userId },
      raw: true,
      nest: true,
    });

    if (User.kycBackImage !== null) {
      removeFile('./assets/kyc/' + User.kycBackImage);
    }

    let UpdateUserKYCBackDoc = await models.User.update(
      { kycBackImage: KYCDocument.filename },
      { where: { id: request.userId } }
    );

    if (UpdateUserKYCBackDoc[0] !== 1) {
      response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ Message: 'Something went wrong', apiresponse: false });
      return;
    }

    response
      .status(StatusCodes.CREATED)
      .json({ Message: 'Added KYC Back Document', apiresponse: true });
  } catch (error) {
    next();
  }
};

const getCartContents = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    // if (request.params.id !== request.userId) {
    //   throw new ErrorHandler(
    //     StatusCodes.FORBIDDEN,
    //     "User requesting for unauthorized service."
    //   );
    // }

    let Cart = await models.Cart.findAll({
      where: { userId: request.params.id },
      raw: true,
      nest: true,
    });

    if (!Cart || Cart.length == 0) {
      response.status(StatusCodes.OK).json({
        type: 'Cart',
        data: {
          CartItems: [],
          NetTotal: 0,
        },
        Message: 'Cart Items for the user.',
        apiresponse: true,
      });

      return;
    }

    let NetTotal = Cart.reduce(
      (previous, current) => previous.subTotal + current.subTotal
    );

    if (Cart.length === 1) {
      NetTotal = Cart[0].subTotal;
    }

    response.status(StatusCodes.OK).json({
      type: 'Cart',
      data: {
        CartItems: Cart,
        NetTotal: NetTotal,
      },
      Message: 'Cart Items for the user.',
      apiresponse: true,
    });
  } catch (error) {
    next();
  }
};

const getCartContents = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    // if (request.params.id !== request.userId) {
    //   throw new ErrorHandler(
    //     StatusCodes.FORBIDDEN,
    //     "User requesting for unauthorized service."
    //   );
    // }

    let Cart = await models.Cart.findAll({
      where: { userId: request.params.id },
      raw: true,
      nest: true,
    });

    if (!Cart || Cart.length == 0) {
      response.status(StatusCodes.OK).json({
        type: 'Cart',
        data: {
          CartItems: [],
          NetTotal: 0,
        },
        Message: 'Cart Items for the user.',
        apiresponse: true,
      });

      return;
    }

    let NetTotal = Cart.reduce(
      (previous, current) => previous.subTotal + current.subTotal
    );

    if (Cart.length === 1) {
      NetTotal = Cart[0].subTotal;
    }

    response.status(StatusCodes.OK).json({
      type: 'Cart',
      data: {
        CartItems: Cart,
        NetTotal: NetTotal,
      },
      Message: 'Cart Items for the user.',
      apiresponse: true,
    });
  } catch (error) {
    next();
  }
};

const getUnapprovedUserListing = async (request, response, next) => {
  try {
    let UnapprovedUsers = await models.User.findAll({
      where: { approved: false },
      attributes: {
        exclude: ['password', 'salt', 'role', 'createdAt', 'updatedAt'],
      },
      raw: true,
      nest: true,
    });

    response.status(StatusCodes.OK).json({
      type: 'User',
      data: [...UnapprovedUsers],
      apiresponse: true,
    });
  } catch (error) {
    next(error);
  }
};

const getUserVirtualWallet = async (request, response, next) => {
  try {
    resolveSchemaValidationResult(request);

    let VirtualWallet = await models.VirtualWallet.findAll({
      where: { userId: request.params.id },
      attributes: ['userId', 'propertyId', 'balance'],
      include: [
        { model: models.Property, attributes: ['name'] },
        {
          model: models.UserProperty,
          attributes: ['units'],
          where: { id: { [Op.col]: 'user_property_id' } },
        },
      ],
    });

    if (VirtualWallet.length == 0) {
      response.status(StatusCodes.OK).json({
        type: 'Virtual Wallet',
        data: [],
        included: {
          type: 'Virtual Wallet Balance',
          data: [{ Balance: 0.0 }],
        },
        apiresponse: true,
      });
      return;
    }

    let WalletTotalBalance = await models.VirtualWallet.findAll({
      where: { userId: request.params.id },
      attributes: [[sequelize.fn('SUM', sequelize.col('balance')), 'Balance']],
    });

    response.status(StatusCodes.OK).json({
      type: 'Virtual Wallet',
      data: [...VirtualWallet],
      included: {
        type: 'Virtual Wallet Balance',
        data: [...WalletTotalBalance],
      },
      apiresponse: true,
    });
  } catch (error) {
    next(error);
  }
};

const createDepositFromWalletRequest = (request, response, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetUserListing: getUserListing,
  ApproveUsers: approveUsers,
  GetUserById: getUserById,
  AddKYCDocumentFront: addKYCDocumentFront,
  AddKYCDocumentBack: addKYCDocumentBack,
  GetCartContents: getCartContents,
  GetUnapprovedUserListing: getUnapprovedUserListing,
  GetUserVirtualWallet: getUserVirtualWallet,
  CreateDepositFromWalletRequest: createDepositFromWalletRequest,
};
