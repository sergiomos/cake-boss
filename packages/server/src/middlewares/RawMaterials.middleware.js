const RawMaterials = require('../services/RawMaterials.service');

exports.createValidation = async (req, _res, next) => {
  const { name, quantity, userId } = req.body;

  const rawMaterialData = await RawMaterials.create({ name, quantity, userId });

  if (rawMaterialData.err) return next(rawMaterialData);

  req.createdRawMaterial = rawMaterialData;
  return next();
};
