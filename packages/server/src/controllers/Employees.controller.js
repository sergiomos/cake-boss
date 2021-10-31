const Employee = require('../services/Employee.service');

exports.create = async (req, res) => {
  const {
    name,
    email,
    password,
    managerId,
    role,
  } = req.body;

  const createdEmployee = await Employee.create({
    name,
    email,
    password,
    managerId,
    role,
  });

  res.status(201).json(createdEmployee);
};
