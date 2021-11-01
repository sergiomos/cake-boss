const RawMaterials = require('../services/RawMaterials.service');
const Orders = require('../services/Orders.service');

exports.createValidation = async (req, _res, next) => {
  const { name, quantity, userId } = req.body;

  const rawMaterialData = await RawMaterials.create({ name, quantity, userId });

  if (rawMaterialData.err) return next(rawMaterialData);

  req.createdRawMaterial = rawMaterialData;
  return next();
};

const getByNameValidation = async (req, _res, next) => {
  const { name: rawMaterialName } = req.query;
  const foundMaterialsData = await RawMaterials.getMaterialsByName(rawMaterialName);

  if (foundMaterialsData.err) return next(foundMaterialsData);

  req.foundData = foundMaterialsData;
  return next();
};

const getRawMaterialRequestsOrders = async (req, _res, next) => {
  const { user: userName } = req.query;
  const foundOrderData = await Orders.getRawMaterialRequestsByUsers(userName);

  req.foundData = foundOrderData;
  return next();
};

exports.queryParametersHandle = (req, res, next) => {
  const { name: rawMaterialName, user: userName } = req.query;

  switch (true) {
    case !!rawMaterialName:
      return getByNameValidation(req, res, next);
    case !!userName:
      return getRawMaterialRequestsOrders(req, res, next);
    default:
      return next();
  }
};
