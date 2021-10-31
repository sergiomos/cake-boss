const Login = require('../services/Login.service');

exports.singIn = async (req, _res, next) => {
  const { email, password } = req.body;

  const data = await Login.singIn({ email, password });

  if (data.err) return next(data);

  req.foundUser = data;

  return next();
};
