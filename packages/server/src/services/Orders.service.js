const validate = require('validate.js');

const Orders = require('../models/Orders.model');
const RawMaterials = require('../models/RawMaterials.model');

const constraints = require('../validation/schemas/createOrder');
const checkRawMaterials = require('../validation/utils/checkRawMaterial');
const userExists = require('../validation/utils/userExists');

exports.create = async ({ rawMaterialId, userId, quantity }) => {
  const error = validate({ rawMaterialId, userId, quantity }, constraints);

  if (error) {
    const [[message]] = Object.values(error);
    return { status: 400, err: { message } };
  }

  const isUserValid = await userExists(userId);
  const { isRawMaterialValid, isQuantityValid } = await checkRawMaterials(rawMaterialId, quantity);

  switch (true) {
    case !isUserValid:
      return { status: 404, err: { message: 'user not found' } };

    case !isRawMaterialValid:
      return { status: 404, err: { message: 'raw material not found' } };

    case !isQuantityValid:
      return { status: 400, err: { message: 'quantity must be equal or lower than quantity in stock' } };

    default: {
      // update raw material quantity
      await RawMaterials.requestRawMaterialFromStock({ rawMaterialId, quantity });
      const createdOrder = Orders.create({ rawMaterialId, userId, quantity });

      return createdOrder;
    }
  }
};
