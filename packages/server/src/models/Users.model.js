const { ObjectId } = require('mongodb');
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

const findUsersByName = async (userName) => {
  const db = await conn();
  const userCollection = await db.collection(COLLECTION_NAME);
  const foundUsers = await userCollection.find({ name: { $regex: userName, $options: 'ig' } }).toArray();

  return foundUsers;
};

exports.getUsersIdByName = async (userName) => {
  const users = await findUsersByName(userName);
  const usersIds = users.map(({ _id }) => _id);

  return usersIds;
};

exports.findUserById = async (userId) => {
  const db = await conn();
  const userCollection = await db.collection(COLLECTION_NAME);
  const foundUser = await userCollection.findOne({ _id: ObjectId(userId) });

  return foundUser;
};

exports.findManagerById = async (managerId) => {
  const db = await conn();
  const userCollection = await db.collection(COLLECTION_NAME);
  const foundUser = await userCollection.findOne({ _id: ObjectId(managerId), role: 'manager' });

  return foundUser;
};

exports.singIn = async (userCredentials) => {
  const db = await conn();
  const userCollection = await db.collection(COLLECTION_NAME);
  const foundUser = await userCollection.findOne(userCredentials);

  return foundUser;
};
