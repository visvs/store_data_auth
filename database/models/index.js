const {User, userSchema} = require('./user.model');
const {Customer, CustomerSchema} = require('./customer.model');
const {Category, CategorySchema} = require('./category.model');
const {Product, ProductSchema} = require('./product.model');
const {Order, OrderSchena} = require('./order.model');

function setupModels(sequelize){
  //Se inicializan los modelos
  User.init(userSchema, User.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))
  Category.init(CategorySchema, Category.config(sequelize))
  Product.init(ProductSchema, Product.config(sequelize))
  Order.init(OrderSchena, Order.config(sequelize))
  //Se ejecutan las asociaciones
  Customer.associate(sequelize.models)
  User.associate(sequelize.models)
  Category.associate(sequelize.models)
  Product.associate(sequelize.models)
  Order.associate(sequelize.models)
}
module.exports = setupModels;
