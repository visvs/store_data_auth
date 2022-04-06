'use strict';

const {CategorySchema, CATEGORY_TABLE} = require('./../models/category.model');
const {ProductSchema, PRODUCT_TABLE} = require('./../models/product.model');

module.exports = {
  async up (queryInterface) {
    //queryInterface nos permite crear las tablas
    await queryInterface.createTable(CATEGORY_TABLE,CategorySchema)
    await queryInterface.createTable(PRODUCT_TABLE,ProductSchema)
  },

  async down (queryInterface) {
   //revertir cambios
   await queryInterface.dropTable(CATEGORY_TABLE);
   await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
