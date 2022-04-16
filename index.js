const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
//middlewares
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const {queryErrorHandler} = require('./middlewares/database.handler');
const { checkAPIKey } = require('./middlewares/auth.handler');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));
require('./utils/auth/index');

app.get('/', (req, res) => {
  res.send('API node.js con Postgres, consulta de usuarios, productos, categorias, autenticación,autorizacion por roles y más');
});
app.get('/test', checkAPIKey,(req, res) => {
  res.send('API node.js con Postgres, consulta de usuarios, productos, categorias, autenticación,autorizacion por roles y más');
});



routerApi(app);
//se ejecutan en orden los middlewares
app.use(logErrors);
app.use(queryErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port ' +  port);
});
