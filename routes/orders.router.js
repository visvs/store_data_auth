const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const OrderService = require('../services/order.service')
const {createOrderSchema, getOrderSchema} = require('../schemas/order.schema')
const router = express.Router();

router.get('/:id',
validatorHandler(getOrderSchema, 'params'),
async (req, res, next) => {
  try {
    const {id} = req.params;
    const order = await OrderService.findOne(id)
    res.json(order)
  } catch (err) {
    next(err);
  }
  res.json([]);
});
router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await OrderService.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
