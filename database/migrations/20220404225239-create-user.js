'use strict';
const {userSchema, USER_TABLE} = require('./../models/user.model')

module.exports = {
  async up (queryInterface) {
    //queryInterface nos permite crear las tablas
    await queryInterface.createTable(USER_TABLE,userSchema)
  },

  async down (queryInterface) {
   //revertir cambios
   await queryInterface.dropTable(USER_TABLE);
  }
};
