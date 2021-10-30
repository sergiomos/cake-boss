const conn = require('../database/connection');

const COLLECTION_NAME = 'managers';

exports.create = async ({ email, name, password }) => {
  const db = await conn();
  const managerCollection = await db.collection(COLLECTION_NAME);
  const { insertedId } = await managerCollection.insertOne({ email, name, password });

  const createdManager = {
    email,
    name,
    _id: insertedId,
  };

  return createdManager;
};
