'use strict';

const { USER_TABLE , userSchema} = require("../models/user.model");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', userSchema.recoveryToken)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token')
  }
};
