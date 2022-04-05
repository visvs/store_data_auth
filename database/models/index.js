const {User, userSchema} = require('./user.model');
const {Customer, CustomerSchema} = require('./customer.model');

function setupModels(sequelize){
  //Se inicializan los modelos
  User.init(userSchema, User.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))
  //Se ejecutan las asociaciones
   Customer.associate(sequelize.models)
   User.associate(sequelize.models)
}
module.exports = setupModels;
