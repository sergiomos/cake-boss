const Users = require('../../models/Users.model');

const managerExists = async (managerId) => {
  const foundManager = await Users.findByManagerId(managerId);

  return !!foundManager;
};

module.exports = managerExists;
