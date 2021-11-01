const RawMaterials = require('../../models/RawMaterials.model');

const checkRawMaterials = async (rawMaterialId, quantity) => {
  const foundRawMaterial = await RawMaterials.getMaterialById(rawMaterialId);

  const isRawMaterialValid = !!foundRawMaterial;
  const isQuantityValid = !!foundRawMaterial && foundRawMaterial.quantity >= quantity;

  return { isRawMaterialValid, isQuantityValid };
};

module.exports = checkRawMaterials;
