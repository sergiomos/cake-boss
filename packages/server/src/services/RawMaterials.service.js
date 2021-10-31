const RawMaterial = require('../models/RawMaterials.model');

exports.create = async (rawMaterialData) => {
  const createdRawMaterial = await RawMaterial.create(rawMaterialData);

  return createdRawMaterial;
};
