const validate = require('validate.js');
const Users = require('../models/Users.model');

const constraints = require('../validation/createManager');

exports.create = async (manager) => {
  const error = validate(manager, constraints);

  if (error) {
    const [[message]] = Object.values(error);
    return { status: 400, err: { message } };
  }

  const alreadyExists = await Users.findByEmail(manager.email);

  if (alreadyExists) return { status: 403, err: { message: 'user already exists' } };

  const createdManager = await Users.create({
    ...manager,
    role: 'manager',
  });

  return createdManager;
};
