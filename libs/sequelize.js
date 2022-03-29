//
const {Sequelize} = require('sequelize');

const {config} = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
//Al tener bases de datos remotas es comun que te den URI de conexion, como a continuacion
//URI body: protocolo://${usuario}:${password}@${host}:${port}/${database}
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
//sequelize tiene integrada la estrategia de pooling
const sequelize = new Sequelize(URI,{
  //tipo de bd
  dialect : 'postgres',
  //cada vez que se haga consulta por ORM se vera en SQL
  logging: true
});
module.exports = sequelize;

