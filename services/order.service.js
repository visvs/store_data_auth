const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize')

class OrderService {

  constructor(){
  }
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }
  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }
  async findByUser(userId) {
    /**
   * contamos con el userID pero no con el customerID
   * por lo que se hace un where por asociaciones customer tiene un usuario, y usuario un id
   */
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });
    return orders;
  }
  async findAll() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      //include: ['customer']
      include: [{
        association: 'customer',
        include: ['user']
      },
      'items'
    ]
    });
    if(!order){
      throw boom.notFound('Order not found')
    }
    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    await order.update(changes);
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { res: true };
  }

}

module.exports = OrderService;
