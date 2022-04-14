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
 * Middleware para verificar el rol admin del usuario
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

/**
 * Middleware para verificar el rol del usuario
 */
 const checkRole = (...roles)=>{
   return (req, res, next) =>{
     const user = req.user;
     if(roles.includes(user.role)){
       next();
     }
     else{
       next(boom.forbidden());
     }
   }
}

module.exports = {checkAPIKey, checkAdminRole, checkRole}
