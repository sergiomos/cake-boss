const Users = require('../models/Users.model');

exports.create = async (data) => {
  const createdEmployee = Users.create(data);

  return createdEmployee;
};
