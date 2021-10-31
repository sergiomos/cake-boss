const isValidId = require('../utils/isAValidId');
const createManagerConstraints = require('./createManager');

module.exports = {
  ...createManagerConstraints,
  role: {
    presence: {
      message: "^role can't be empty",
    },
  },

  managerId: {
    presence: {
      message: "^managerId can't be empty",
    },
    type: {
      type: isValidId,
      message: '^invalid managerId',
    },
  },
};
