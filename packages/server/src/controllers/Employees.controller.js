exports.create = async (req, res) => {
  const { createdEmployee } = req;
  res.status(201).json(createdEmployee);
};
