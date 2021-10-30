const express = require('express');

const routes = express.Router();

const managerRoutes = require('./manager');
const employeesRoutes = require('./employees');

routes.use('/manager', managerRoutes);
routes.use('/employees', employeesRoutes);

module.exports = routes;
