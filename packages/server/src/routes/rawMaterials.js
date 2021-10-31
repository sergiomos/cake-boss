const express = require('express');

const routes = express.Router();

const RawMaterials = require('../controllers/RawMaterials.controller');
const RawMaterialsMiddle = require('../middlewares/RawMaterials.middleware');

routes.post(
  '/',
  RawMaterialsMiddle.createValidation,
  RawMaterials.create,
);

module.exports = routes;
