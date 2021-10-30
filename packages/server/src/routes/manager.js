const express = require('express');

const routes = express.Router();

const Manager = require('../controllers/Manager.controller');
const ManagerMiddle = require('../middlewares/Manager.middleware');

routes.post(
  '/',
  ManagerMiddle.createValidation,
  Manager.create,
);

module.exports = routes;
