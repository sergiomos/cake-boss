const conn = require('../database/connection');

const COLLECTION_NAME = 'users';

exports.create = async (user) => {
  const db = await conn();
  const userCollection = await db.collection(COLLECTION_NAME);
  const { password, ...userRest } = user;
  const { insertedId } = await userCollection.insertOne(user);

  const createdUser = {
    ...userRest,
    _id: insertedId,
  };

  return createdUser;
};

exports.findByEmail = async (userEmail) => {
  const db = await conn();
  const userCollection = await db.collection(COLLECTION_NAME);
  const foundUser = await userCollection.findOne({ email: userEmail });

  return foundUser;
};
