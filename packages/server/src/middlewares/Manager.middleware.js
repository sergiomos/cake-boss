const Manager = require('../services/Manager.service');

exports.createValidation = async (req, _res, next) => {
  const { name, email, password } = req.body;
  const data = await Manager.create({ name, email, password });

  if (data.err) return next(data);

  req.createdManager = data;
  return next();
};
