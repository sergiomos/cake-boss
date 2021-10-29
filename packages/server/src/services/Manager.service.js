const Manager = require('../models/Manager.model');

exports.create = async ({ email, name, password }) => {
  const createdManager = await Manager.create({ email, name, password });

  return createdManager;
};
