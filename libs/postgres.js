const {Client} = require('pg');

async function getConnection(){
  const cliente = new Client({
    host: 'localhost',
    port: 5432,
    user: "vivs",
    password: 'admin123',
    database: 'my_store'
  });
  //se ejecuta la coneccion pero esta retorna una promesa, asi que lo manejaremos asincronamente
  await cliente.connect();
  //retornamos el cliente para que se puedan ejecutar consultas
  return cliente;
}
module.exports = {
  getConnection
}
