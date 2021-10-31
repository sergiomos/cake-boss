const validate = require('validate.js');
const RawMaterial = require('../models/RawMaterials.model');

const constraints = require('../validation/schemas/createRawMaterial');

const userExists = require('../validation/utils/userExists');

exports.create = async (rawMaterialData) => {
  const error = validate(rawMaterialData, constraints);

  if (error) {
    const [[message]] = Object.values(error);
    return { status: 400, err: { message } };
  }

  const isUserValid = await userExists(rawMaterialData.userId);
  if (!isUserValid) return { status: 404, err: { message: 'user not found' } };

  const createdRawMaterial = await RawMaterial.create(rawMaterialData);
  return createdRawMaterial;
};
