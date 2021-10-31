const { ObjectId } = require('mongodb');

const isAValidId = (id) => ObjectId.isValid(id);

module.exports = isAValidId;
