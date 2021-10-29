const conn = require('../database/connection');

const COLLECTION_NAME = 'managers';

exports.create = async ({ email, name, password }) => {
  const managerCollection = await conn().db.collection(COLLECTION_NAME);
  const createdManager = await managerCollection.insertOne({ email, name, password });

  return createdManager;
};
