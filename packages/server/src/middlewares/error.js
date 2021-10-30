const errorMiddleware = (error, _req, res, _next) => {
  const { status, err } = error;
  res.status(status).json({ err });
};

module.exports = errorMiddleware;
