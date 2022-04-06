const faker = require('faker');
//const boom = require('@hapi/boom');
const {pool} = require('../libs/postgres pool');
const {models} = require('../libs/sequelize');


class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err)=>console.log(err))
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }
//Con lista de productos
/*   async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  } */
  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }
 /*  async find() {
    const query = 'SELECT * FROM task';
    const response = await this.pool.query(query);
    return response.rows;
  } */
  //Con ORM
 /*  async find() {
    const query = 'SELECT * FROM task';
    const [data] = await sequelize.query(query);
    return data;
  } */
  async find() {
    const products = await models.Product.findAll({
      include: ['category']
    });
    return products;
  }

/*   async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  } */

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    return product;
  }

/*   async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  } */
  async update(id, changes) {
    const category = await this.findOne(id);
    const res = await category.update(changes);
    return res;
  }

/*   async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  } */
  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { res: true};
  }

}

module.exports = ProductsService;
