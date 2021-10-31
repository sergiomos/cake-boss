exports.create = async (req, res) => {
  const { createdRawMaterial } = req;

  res.status(201).json(createdRawMaterial);
};

exports.getMaterialsByName = async (req, res) => {
  const { foundMaterials } = req;

  res.status(200).json(foundMaterials);
};
