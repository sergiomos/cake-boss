const express = require('express');
const cors = require('cors');

const errorMiddleware = require('./middlewares/error');

const app = express();

const routes = require('./routes');

app.use(express.json());
app.use(cors());

app.use(routes);
app.use(errorMiddleware);

app.get('/', (_req, res) => {
  res.send();
});

module.exports = app;
