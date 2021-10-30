const Users = require('../models/Users.model');

exports.create = async ({ email, name, password }) => {
  const createdManager = await Users.create({
    email,
    name,
    password,
    role: 'manager',
  });

  return createdManager;
};
