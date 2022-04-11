const {Strategy}  = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt  = require('bcrypt');

const userService = require('../../../services/user.service');

const service = new userService();

const localStrategy = new Strategy( {
  usernameField: 'email',
  passwordField: 'password'
},
  async (username, password, done) =>{
    try {
      const user = await service.findByEmail(username);
      if(!user){
        done(boom.unauthorized(), false);
      }
      const isValidate = await bcrypt.compare(password, user.password)
      if(!isValidate){
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      done(null, user)
    } catch (error) {
      done(error, false);
    }
});

module.exports = localStrategy;
