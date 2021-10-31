const { ObjectId } = require('mongodb');
const validate = require('validate.js');
const Users = require('../models/Users.model');

const constraints = require('../validation/createEmployee');

exports.create = async (data) => {
  const error = validate(data, constraints);

  if (error) {
    const [[message]] = Object.values(error);
    return { status: 400, err: { message } };
  }

  const alreadyExists = await Users.findByEmail(data.email);

  if (alreadyExists) return { status: 403, err: { message: 'user already exists' } };

  if (!ObjectId.isValid(data.managerId)) return { status: 400, err: { message: 'invalid managerId' } };

  const managerExists = await Users.findByManagerId(data.managerId);

  if (!managerExists) return { status: 404, err: { message: 'manager not found' } };

  const createdEmployee = Users.create(data);

  return createdEmployee;
};
