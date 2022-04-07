const {Pool} = require('pg');

const {config} = require('../config/config');
let URI;
const options  = {}
if (config.isProd) {
  options.connectionString = config.dbURL;
  options.ssl =  {
    rejectUnauthorized: false
  };
}
else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  //Al tener bases de datos remotas es comun que te den URI de conexion, como a continuacion
  //URI body: protocolo://${usuario}:${password}@${host}:${port}/${database}
  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options.connectionString = URI;
}


//Conexion por parametros
/*   const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: "vivs",
    password: 'admin123',
    database: 'my_store'
  }); */
  //Conexion por URI


  const pool = new Pool();
module.exports = {
  pool
}
