const { Model, DataTypes, Sequelize } = require('sequelize');

const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchena = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  status: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  total: {
    type: DataTypes.VIRTUAL,
    get(){
      if(this.items.length){
        if(this.items.length > 0 ){
          return this.items.reduce((total, current) => {
            return total + (current.price * current.OrderProduct.amount)
          }, 0)
        }
      }
      return 0;
    }
  }
}


class Order extends Model {

  static associate(models) {
    //Una orden pertenece a un cliente
    this.belongsTo(models.Customer, { as: 'customer' });
    //Una orden tiene muchos productos
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}
module.exports = { Order, OrderSchena, ORDER_TABLE };
