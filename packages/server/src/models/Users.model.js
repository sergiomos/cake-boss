const conn = require('../database/connection');

const COLLECTION_NAME = 'users';

exports.create = async (user) => {
  const db = await conn();
  const managerCollection = await db.collection(COLLECTION_NAME);
  const { password, ...userRest } = user;
  const { insertedId } = await managerCollection.insertOne(user);

  const createdManager = {
    ...userRest,
    _id: insertedId,
  };

  return createdManager;
};
