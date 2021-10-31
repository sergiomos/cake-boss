const express = require('express');

const routes = express.Router();

const Employees = require('../controllers/Employees.controller');
const EmployeesMiddle = require('../middlewares/Employees.middleware');

routes.post(
  '/',
  EmployeesMiddle.createValidation,
  Employees.create,
);

module.exports = routes;
