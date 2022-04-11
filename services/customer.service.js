const boom = require('@hapi/boom');
//const bcrypy = require('bcrypt');

const { models } = require('../libs/sequelize');

class CustomerService {

  constructor() {}

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id, {include: ['user']});
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data) {
    //Forma 1 de crear usuario desde customer
    /* const newUser = await models.User.create(data.user)
    const newCustomer = await models.Customer.create({
      ...data,
      userId: newUser.id
    }); */
    //Forma 2
   /*  const hash = await bcrypy.hash(data.user.password, 10)
    const dataC = {
      ...data,
      user : {
        ...data.user,
        password : hash
      }
    } */
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = CustomerService;
