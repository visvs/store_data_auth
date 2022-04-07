'use strict';

const { ORDER_PROD_TABLE, OrderProductSchema } = require("../models/order-product.model");

module.exports = {
  async up (queryInterface) {
    //queryInterface nos permite crear las tablas
    await queryInterface.createTable(ORDER_PROD_TABLE,OrderProductSchema)
  },

  async down (queryInterface) {
   //revertir cambios
   await queryInterface.dropTable(ORDER_PROD_TABLE);
  }
};
