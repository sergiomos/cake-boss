const express = require('express');

const routes = express.Router();

const managerRoutes = require('./manager');

routes.use('/manager', managerRoutes);

module.exports = routes;
