exports.singIn = async (req, res) => {
  const { role, _id } = req.foundUser;

  res.status(200).json({ role, _id: _id.toString() });
};
