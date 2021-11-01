const isValidId = require('../utils/isAValidId');

module.exports = {
  quantity: {
    numericality: {
      greaterThan: 0,
      notGreaterThan: '^quantity must be greater than 0',
    },
  },
  rawMaterialId: {
    type: {
      type: isValidId,
      message: '^invalid rawMaterialId',
    },
  },
  userId: {
    type: {
      type: isValidId,
      message: '^invalid userId',
    },
  },
};
