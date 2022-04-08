# Backend con node.js y postgres

En este proyecto se crea una arquitectura separada por esquemas, modelos, servicios y rutas para manejar las entidades que se tendrán en la BD, además se hace uso del ORM sequelize para poder abstraer el manejo de la BD y poder cambiar facilmente de motor de BD. 
El proyecto es la continuación de un curso anterior de Platzi, por lo que se contaba con un template inicial

Se desarrolla pensandolo en un entorno de producción por lo que se hace uso de migraciones del ORM, para tener un control de los cambios en la BD

### Paquete para crear y ejecutar migraciones en Sequelize

El paquete cli de nos permitira hacer migraciones
```
npm install sequelize-cli --save-dev
```

### Ejecutar migraciones en produccion (servidor en heroku)
```
heroku run npm run migrations:run
```
#### El proyecto se llevo a entorno productivo
- [API](https://my-store-service.herokuapp.com/)
