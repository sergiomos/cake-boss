exports.create = async (req, res) => {
  const { createdRawMaterial } = req;

  res.status(201).json(createdRawMaterial);
};

exports.getMaterialsController = async (req, res) => {
  const { foundData } = req;

  res.status(200).json(foundData);
};
