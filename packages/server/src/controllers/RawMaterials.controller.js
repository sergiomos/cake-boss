const RawMaterials = require('../services/RawMaterials.service');

exports.create = async (req, res) => {
  const { name, quantity, userId } = req.body;
  const createdRawMaterial = await RawMaterials.create({ name, quantity, userId });

  res.status(201).json(createdRawMaterial);
};
