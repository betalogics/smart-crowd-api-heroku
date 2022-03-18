const getUserByIdSchema = {
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

const approveUsersSchema = {
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

const getUsersCartContents = {
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

const addKycDocuments = {
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

const getUserVirtualWallet = {
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

const updateUserAttributesSchema = {
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
  firstName: {
    in: ["body"],
    isString: true,
    optional: true
  },
  lastName: {
    in: ["body"],
    isString: true,
    optional: true
  },
  isUsCitizen: {
    in: ["body"],
    isBoolean: true,
    optional: true
  },
  kycDocumentType: {
    in: ["body"],
    isString: true,
    optional: true
  },
  countryOfOrigin: {
    in: ["body"],
    isString: true,
    optional: true
  }
}

module.exports = {
  ApproveUsersSchema: approveUsersSchema,
  GetUserByIdSchema: getUserByIdSchema,
  GetUsersCartContentsSchema: getUsersCartContents,
  AddKYCDocumentsSchema: addKycDocuments,
  GetUserVirtualWalletSchema: getUserVirtualWallet,
  UpdateUserAttributesSchema: updateUserAttributesSchema
}