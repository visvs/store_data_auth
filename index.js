const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
//middlewares
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const {queryErrorHandler} = require('./middlewares/database.handler')
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

app.get('/', (req, res) => {
  res.render('frontend')
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
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
