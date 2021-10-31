const Users = require('../../models/Users.model');

module.exports = async (userEmail) => {
  const foundUser = await Users.findByEmail(userEmail);
  return !!foundUser;
};
