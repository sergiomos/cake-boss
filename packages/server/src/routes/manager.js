const express = require('express');

const routes = express.Router();

routes.post('/', (_req, res) => {
  res.status(201).json({ ok: 'ok' });
});

module.exports = routes;
