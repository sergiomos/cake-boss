const express = require('express');

const routes = express.Router();

const Employees = require('../controllers/Employees.controller');

routes.post(
  '/',
  Employees.create,
);

module.exports = routes;
