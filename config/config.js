//Configuracion base para leer variables de entorno
require('dotenv').config();
const config = {
  //Siempre tenemos disponible la variable de entorno para node
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  //Puerto en el que se corre la aplicacion
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbURL: process.env.DATABASE_URL,
  apikey: process.env.API_KEY,
  JWT_secret: process.env.JWT_SECRET,
}
module.exports = {config}
