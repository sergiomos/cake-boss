const express = require('express');

const routes = express.Router();

const Manager = require('../controllers/Manager.controller');

routes.post('/', Manager.create);

module.exports = routes;
