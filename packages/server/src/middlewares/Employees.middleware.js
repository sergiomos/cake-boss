const Employees = require('../services/Employees.service');

exports.createValidation = async (req, _res, next) => {
  const {
    name,
    email, password,
    managerId,
    role,
  } = req.body;

  const data = await Employees.create({
    name,
    email,
    password,
    managerId,
    role,
  });

  if (data.err) return next(data);

  req.createdEmployee = data;
  return next();
};
