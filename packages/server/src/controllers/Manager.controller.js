exports.create = (req, res) => {
  const { createdManager } = req;
  res.status(201).json(createdManager);
};
