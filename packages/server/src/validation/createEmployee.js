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
  },
};
