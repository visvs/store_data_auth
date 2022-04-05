'use strict';

const {CustomerSchema, CUSTOMER_TABLE} = require('./../models/customer.model')


module.exports = {
  async up (queryInterface) {
    //queryInterface nos permite crear las tablas
    await queryInterface.createTable(CUSTOMER_TABLE,CustomerSchema)
  },

  async down (queryInterface) {
   //revertir cambios
   await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
