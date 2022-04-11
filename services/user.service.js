const boom = require('@hapi/boom');
//const bcrypy = require('bcrypt');


//const {getConnection} = require('../libs/postgres');
const {models} = require('../libs/sequelize');
class UserService {
  constructor() {}

  async create(data) {
   /*  const hash = await bcrypy.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    }) */
    const newUser = await models.User.create(data);
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    //const cliente = await getConnection();
    const result = await models.User.findAll({
      include: ['customer']
    });
    //const response = await  cliente.query('SELECT * FROM task')
    return result//response.rows;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('User not found');
    }
    return user;
  }
  async findByEmail(email) {
    const user = await models.User.findOne({
      where: {email}
    });
    if(!user){
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
