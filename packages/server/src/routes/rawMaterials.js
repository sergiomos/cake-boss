const express = require('express');

const routes = express.Router();

const RawMaterials = require('../controllers/RawMaterials.controller');
const RawMaterialsMiddle = require('../middlewares/RawMaterials.middleware');

const OrdersMiddle = require('../middlewares/Orders.middleware');
const Orders = require('../controllers/Orders.controller');

routes.route('/')
  .get(
    RawMaterialsMiddle.queryParametersHandle,
    RawMaterials.getMaterialsController,
  )
  .post(
    RawMaterialsMiddle.createValidation,
    RawMaterials.create,
  );

routes.put(
  '/:rawMaterialId/request',
  OrdersMiddle.createOrderMiddle,
  Orders.create,
);

module.exports = routes;
