const express = require('express');

const routes = express.Router();

const RawMaterials = require('../controllers/RawMaterials.controller');
const RawMaterialsMiddle = require('../middlewares/RawMaterials.middleware');

routes.route('/')
  .get(
    RawMaterialsMiddle.getByNameValidation,
    RawMaterials.getMaterialsByName,
  )
  .post(
    RawMaterialsMiddle.createValidation,
    RawMaterials.create,
  );

module.exports = routes;
