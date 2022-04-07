const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const description = Joi.string().min(10);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const categoryID = Joi.number().integer();

const limit = Joi.number().integer();
const page = Joi.number().integer();
const max_price = Joi.number().integer();
const min_price = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryID.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryID
});

const getProductSchema = Joi.object({
  id: id.required(),
});
const queryProductSchema = Joi.object({
 limit,
 page,
 price,
 min_price,
 max_price
 //Si se recibe min_price sera obligatorio el campo de max_price para filtrar por rango y viceversa
 //Validacion 1
 /* max_price : max_price.when('min_price', {
   is: Joi.number().integer,
   then: Joi.required()
 }), */
})
.with('min_price', 'max_price')
.with('max_price', 'min_price');

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
