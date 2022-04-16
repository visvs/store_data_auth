const { boom } = require('@hapi/boom');
const userService = require('./user.service');
const bcrypt = require('bcrypt');
const service = new userService();
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const {config} = require('../config/config');

class AuthService {

  constructor(){
  }
  async getUser (email, password) {
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const isValidate = await bcrypt.compare(password, user.password)
    if(!isValidate){
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.JWT_secret);
    return {
      user,
      token
    }
  }

  async sendRecovery(email){
    const user = await service.findByEmail(email);
    if(!user) {
      throw boom.unauthorized();
    }
    const payload = {
      sub : user.id,
    }
    const token = jwt.sign(payload, config.JWT_secret, {expiresIn: '15min'});
    const link = `http://myfronted.com/recovery?token=${token}`
    await service.update(user.id, {recoveryToken: token})
    const body_email = {
      from:  config.email_app,
      to: `${user.email}`, // list of receivers
      subject: "Email para recuperar la contraseña", // Subject line
      html: `<b>Ingresa a este link => ${link}</b>`, // html body
    }
    const respuesta = await this.sendMail(body_email);
    return respuesta;
  }

  async sendMail(body_email){

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.email_app,
        pass: config.password_sender
      },
    });
    await transporter.sendMail(body_email);
    return{ message: 'mail sent'}
  }

  async changePassword(token, newPassword){
    try {
      //Verificación manual del token
      const payload = jwt.verify(token, config.JWT_secret)
      const user = await service.findOne(payload.sub);
      if(user.recoveryToken !== token){
        throw boom.unauthorized();
      }
      else{
        service.update(user.id, {recoveryToken: null, password: newPassword})
        return {
          message: 'Password changed'
        }
      }
    } catch (error) {
      throw boom.unauthorized();
    }
  }

}

module.exports = AuthService;
