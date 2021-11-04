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
    quantity: Number(quantity),
    userId: ObjectId(userId),
    createdDate,
    rawMaterialId: ObjectId(rawMaterialId),
  });

  const { name: user } = await Users.findUserById(userId);

  const createdOrder = {
    _id: insertedId,
    quantity,
    user,
  };

  return createdOrder;
};

exports.getRawMaterialRequestsByUsers = async (userName) => {
  const usersId = await Users.getUsersIdByName(userName);

  const db = await conn();
  const ordersCollection = await db.collection(COLLECTION_NAME);
  const foundOrders = await ordersCollection.aggregate([
    { $match: { userId: { $in: usersId } } },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $lookup: {
        from: 'rawMaterials',
        localField: 'rawMaterialId',
        foreignField: '_id',
        as: 'rawMaterial',
      },
    },
    {
      $set: { user: '$user.name', name: '$rawMaterial.name' },
    },
    { $unwind: '$user' },
    { $unwind: '$name' },
    {
      $project: {
        rawMaterialId: 0,
        userId: 0,
        rawMaterial: 0,
      },
    },

  ]).toArray();

  return foundOrders;
};
