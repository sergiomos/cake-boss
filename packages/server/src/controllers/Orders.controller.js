exports.create = async (req, res) => {
  const { createdOrder } = req;
  res.status(200).json(createdOrder);
};
