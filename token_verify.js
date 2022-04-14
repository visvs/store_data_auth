//Generar firma jwt
const jwt = require('jsonwebtoken');

//Secreto que unicamente debe tener el servidor
const secret = 'code_cat_me';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInNjb3BlIjpbXSwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjQ5NzIxNTk3fQ.WrDRB7lKzEuAH4HfRiUnpGlNSKWWr1jlellnR7cBIkY'
const verifyToken = (token, secret)=>{
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret)

console.log({payload});
