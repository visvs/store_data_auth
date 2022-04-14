//Generar firma jwt
const jwt = require('jsonwebtoken');

//Secreto que unicamente debe tener el servidor
const secret = 'code_cat_mew';

const payload = {
  //Identificador del usuario
  sub: 1,
  //Permisos
  scope: [],
  role: 'customer'
}

const signToken = (payload, secret)=>{
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret)

console.log({token})
