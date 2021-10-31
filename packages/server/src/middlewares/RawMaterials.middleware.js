const RawMaterials = require('../services/RawMaterials.service');

exports.createValidation = async (req, _res, next) => {
  const { name, quantity, userId } = req.body;

  const rawMaterialData = await RawMaterials.create({ name, quantity, userId });

  if (rawMaterialData.err) return next(rawMaterialData);

  req.createdRawMaterial = rawMaterialData;
  return next();
};

exports.getByNameValidation = async (req, _res, next) => {
  const { name: rawMaterialName } = req.query;
  const foundMaterialsData = await RawMaterials.getMaterialsByName(rawMaterialName);

  if (foundMaterialsData.err) return next(foundMaterialsData);

  req.foundMaterials = foundMaterialsData;
  return next();
};
