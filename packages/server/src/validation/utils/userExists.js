const Users = require('../../models/Users.model');

module.exports = async (userId) => {
  const foundUser = await Users.findUserById(userId);

  return !!foundUser;
};
