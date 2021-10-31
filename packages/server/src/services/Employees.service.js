const validate = require('validate.js');
const Users = require('../models/Users.model');

const constraints = require('../validation/schemas/createEmployee');

const isEmailUnique = require('../validation/utils/isEmailUnique');
const managerExistsValidation = require('../validation/utils/managerExists');

exports.create = async (data) => {
  const error = validate(data, constraints);

  if (error) {
    const [[message]] = Object.values(error);
    return { status: 400, err: { message } };
  }

  const userExists = await isEmailUnique(data.email);
  const managerExists = await managerExistsValidation(data.managerId);

  switch (true) {
    case userExists:
      return { status: 403, err: { message: 'user already exists' } };

    case !managerExists:
      return { status: 404, err: { message: 'manager not found' } };

    default:
    {
      const createdEmployee = Users.create(data);
      return createdEmployee;
    }
  }
};
