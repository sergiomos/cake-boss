const express = require('express');

const routes = express.Router();

const managerRoutes = require('./manager');
const employeesRoutes = require('./employees');
const loginRoutes = require('./login');

routes.use('/manager', managerRoutes);
routes.use('/employees', employeesRoutes);
routes.use('/login', loginRoutes);

module.exports = routes;
