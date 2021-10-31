const express = require('express');

const routes = express.Router();

const Login = require('../controllers/Login.controller');
const LoginMiddle = require('../middlewares/Login.middleware');

routes.post(
  '/',
  LoginMiddle.singIn,
  Login.singIn,
);

module.exports = routes;
