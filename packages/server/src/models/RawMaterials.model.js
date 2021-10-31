const { ObjectId } = require('mongodb');
const conn = require('../database/connection');

const COLLECTION_NAME = 'rawMaterials';

exports.create = async ({ userId, ...rawMaterialData }) => {
  const db = await conn();
  const rawMaterialCollection = await db.collection(COLLECTION_NAME);
  const { insertedId } = await rawMaterialCollection
    .insertOne({ ...rawMaterialData, userId: ObjectId(userId) });

  return { ...rawMaterialData, _id: insertedId, userId };
};

exports.getMaterialsByName = async (rawMaterialName) => {
  const db = await conn();
  const rawMaterialCollection = await db.collection(COLLECTION_NAME);
  const foundMaterials = await rawMaterialCollection.aggregate([
    { $match: { name: { $regex: rawMaterialName, $options: 'ig' } } },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $set: { user: '$user.name' },
    },
    { $unwind: '$user' },
    {
      $project: {
        userId: 0,
      },
    },
  ]).toArray();

  return foundMaterials;
};
