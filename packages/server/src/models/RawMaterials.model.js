const conn = require('../database/connection');

const COLLECTION_NAME = 'rawMaterials';

exports.create = async (rawMaterialData) => {
  const db = await conn();
  const rawMaterialCollection = await db.collection(COLLECTION_NAME);
  const { insertedId } = rawMaterialCollection.insertOne(rawMaterialData);

  return { ...rawMaterialData, _id: insertedId };
};
