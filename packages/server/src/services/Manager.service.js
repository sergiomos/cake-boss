const validate = require('validate.js');
const Users = require('../models/Users.model');

const constraints = require('../validation/createManager');

exports.create = async (manager) => {
  const error = validate(manager, constraints);

  if (error) {
    const [[message]] = Object.values(error);
    return { status: 400, err: { message } };
  }

  const createdManager = await Users.create({
    ...manager,
    role: 'manager',
  });

  return createdManager;
};
