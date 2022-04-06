const Joi = require('joi');

const customerId = Joi.number().integer();
const id = Joi.number().integer();
const status = Joi.number().integer();

const createOrderSchema = Joi.object({
  id: id.required()
})

const getOrderSchema = Joi.object({
 customerId : customerId.required(),
 status: status.required()
})

module.exports = {
  createOrderSchema, getOrderSchema
}
