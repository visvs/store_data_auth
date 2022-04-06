'use strict';

const {OrderSchena, ORDER_TABLE} = require('../models/order.model')

module.exports = {
  async up (queryInterface) {
    //queryInterface nos permite crear las tablas
    await queryInterface.createTable(ORDER_TABLE,OrderSchena)
  },

  async down (queryInterface) {
   //revertir cambios
   await queryInterface.dropTable(ORDER_TABLE);
  }
};
