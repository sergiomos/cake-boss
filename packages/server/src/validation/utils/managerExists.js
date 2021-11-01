const Users = require('../../models/Users.model');

const managerExists = async (managerId) => {
  const foundManager = await Users.findManagerById(managerId);

  return !!foundManager;
};

module.exports = managerExists;
