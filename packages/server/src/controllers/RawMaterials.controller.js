exports.create = async (req, res) => {
  const { createdRawMaterial } = req;

  res.status(201).json(createdRawMaterial);
};
