const Users = require('../models/Users.model');

exports.singIn = async (userCredentials) => {
  const foundUser = await Users.singIn(userCredentials);

  if (!foundUser) return { status: 401, err: { message: 'Wrong email or password' } };

  return foundUser;
};
