const express = require('express');
const passport = require('passport');

const CustomerService = require('../services/customer.service');
const validationHandler = require('../middlewares/validator.handler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customer.schema');
const { checkRole } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new CustomerService();

router.get('/:id',
passport.authenticate('jwt', {session: false}) ,
checkRole('admin', 'seller'),
validationHandler(getCustomerSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(await service.findOne(id));
  } catch (error) {
    next(error);
  }
});

router.get('/',  async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}) ,
  checkRole('customer'),
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
passport.authenticate('jwt', {session: false}) ,
checkRole('admin', 'customer'),
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
