const express = require('express');

const routes = express.Router();

const managerRoutes = require('./manager');
const employeesRoutes = require('./employees');
const loginRoutes = require('./login');
const rawMaterialsRoutes = require('./rawMaterials');

routes.use('/manager', managerRoutes);
routes.use('/employees', employeesRoutes);
routes.use('/login', loginRoutes);
routes.use('/rawMaterial', rawMaterialsRoutes);

module.exports = routes;
