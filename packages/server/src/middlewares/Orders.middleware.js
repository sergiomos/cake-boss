const Orders = require('../services/Orders.service');

exports.createOrderMiddle = async (req, _res, next) => {
  const { rawMaterialId } = req.params;
  const { quantity, userId } = req.body;

  const orderData = await Orders.create({ rawMaterialId, quantity, userId });

  if (orderData.err) return next(orderData);

  req.createdOrder = orderData;
  return next();
};
