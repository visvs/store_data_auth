const faker = require('faker');
//const boom = require('@hapi/boom');
const {pool} = require('../libs/postgres pool');
const {models} = require('../libs/sequelize');
const { Op } = require('sequelize');

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
  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const {limit, page} = query;
    if(limit && page){
      options.limit = limit,
      options.offset = limit * (page - 1)
    }
    const {price} = query;
    if(price){
      options.where.price = price
    }
    const {min_price, max_price} = query;
    if(min_price && max_price){
      options.where.price = {
        //Si se reciben los rangos evalia que el precio sea
        //mayor o igual
        //[Op.gte] : min_price,
        //Menor igual
        //[Op.lte] : max_price
        [Op.between] : [min_price, max_price]
      }
    }

    const products = await models.Product.findAll(options);
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
    const product = await models.Product.findByPk(id,{
      include: ['category']
    });
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
