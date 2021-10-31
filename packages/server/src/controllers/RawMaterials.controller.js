const RawMaterials = require('../services/RawMaterials.service');

exports.create = async (req, res) => {
  const { createdRawMaterial } = req;

  res.status(201).json(createdRawMaterial);
};

exports.getMaterialsByName = async (req, res) => {
  const { name: rawMaterialName } = req.query;

  const foundMaterials = await RawMaterials.getMaterialsByName(rawMaterialName);

  res.status(200).json(foundMaterials);
};
