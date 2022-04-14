const boom = require('@hapi/boom');
const config = require('../config/config')
const checkAPIKey = ( req, res, next) =>{
  const apiKey = req.headers['api'];
  console.log(apiKey === config.apikey)
  if(apiKey === config.apikey){

    next();
  }
  else {
    next(boom.unauthorized())
  }
}
/**
 * Middleware para verificar el rol del usuario
 */
const checkAdminRole = (req, res, next)=>{
  const user = req.user;
  console.log(user)
  if(user.role === 'admin'){
    next();
  }else{
    next(boom.unauthorized());
  }
}

module.exports = {checkAPIKey, checkAdminRole}
