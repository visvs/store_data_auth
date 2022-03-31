const {Model, DataTypes, Sequelize} = require('sequelize');

const USER_TABLE = 'users';
//Define el esquema y tipos de la tabla de users
const userSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

//Definimos la clase con el modelo creado
class User extends Model {
  //definimos metodos static para acceder a los metodos sin declaracion
  static associate(){
    //Relaciones
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}
module.exports = {
  USER_TABLE,
  userSchema,
  User
}
