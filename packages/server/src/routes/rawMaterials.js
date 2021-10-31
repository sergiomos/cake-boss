const express = require('express');

const routes = express.Router();

const RawMaterials = require('../controllers/RawMaterials.controller');
// const LoginMiddle = require('../middlewares/Login.middleware');

routes.post(
  '/',
  RawMaterials.create,
);

module.exports = routes;
