//
const {Sequelize} = require('sequelize');

const {config} = require('../config/config');
const setupModels = require('../database/models/index');
/*
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword); */
//Al tener bases de datos remotas es comun que te den URI de conexion, como a continuacion
//URI body: protocolo://${usuario}:${password}@${host}:${port}/${database}
//URI para mysql
/* const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
 *///URI para postgres
/* const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}` */

let options = {
//tipo de bd
dialect : 'postgres',
//cada vez que se haga consulta por ORM se vera en SQL
logging: config.isProd ? false : true,
}
if(config.isProd) {
  options.ssl = {
    rejectUnauthorized: false
  }
}
//sequelize tiene integrada la estrategia de pooling
const sequelize = new Sequelize(config.dbURL,options);
setupModels(sequelize);
//Sincroniza los modelos --> lee los modelos y los crea
//no se recomienda su uso en produccion
//sequelize.sync();
module.exports = sequelize;

