const isAValidId = require('../utils/isAValidId');

module.exports = {
  name: {
    presence: {
      message: "^name can't be empty",
    },
    length: {
      minimum: 3,
      tooShort: '^name must be equal or larger than 3',
    },
  },

  quantity: {
    presence: {
      message: "^quantity can't be empty",
    },
    numericality: {
      greaterThan: 0,
      message: '^quantity must be greater than 0',
    },
  },

  userId: {
    presence: {
      message: "^userId can't be empty",
    },
    type: {
      type: isAValidId,
      message: '^userId invalid',
    },
  },
};
