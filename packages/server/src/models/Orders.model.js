const { ObjectId } = require('mongodb');
const conn = require('../database/connection');
const getCurrentDate = require('../utils/getCurrentDate');

const Users = require('./Users.model');

const COLLECTION_NAME = 'orders';

exports.create = async ({ quantity, userId, rawMaterialId }) => {
  const db = await conn();
  const ordersCollection = await db.collection(COLLECTION_NAME);
  const createdDate = getCurrentDate();

  const { insertedId } = await ordersCollection.insertOne({
    quantity,
    userId: ObjectId(userId),
    createdDate,
    rawMaterialId,
  });

  const { name: user } = await Users.findUserById(userId);

  const createdOrder = {
    _id: insertedId,
    quantity,
    user,
  };

  return createdOrder;
};
