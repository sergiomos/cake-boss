const Manager = require('../services/Manager.service');

exports.create = async (req, res) => {
  const { name, email, password } = req.body;
  const createdManager = await Manager.create({ name, email, password });

  res.status(201).json(createdManager);
};
