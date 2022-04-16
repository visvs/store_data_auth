const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const service = require('../services/order.service')
const {createOrderSchema, getOrderSchema, addItemSchema} = require('../schemas/order.schema');
const passport = require('passport');
const {checkRole} = require('./../middlewares/auth.handler');
const router = express.Router();

const OrderService = new service()

router.get('/:id',
passport.authenticate('jwt', {session: false}) ,
checkRole('customer', 'admin'),
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
passport.authenticate('jwt', {session: false}) ,
checkRole('customer', 'admin'),
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
router.post('/addItem',
passport.authenticate('jwt', {session: false}) ,
checkRole('customer', 'admin'),
validatorHandler(addItemSchema, 'body'),
async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await OrderService.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
