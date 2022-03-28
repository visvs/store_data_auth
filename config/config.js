//Configuracion base para leer variables de entorno
const config = {
  //Siempre tenemos disponible la variable de entorno para node
  env: process.env.NODE_ENV || 'dev',
  //Puerto en el que se corre la aplicacion
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
}
module.exports = {config}
