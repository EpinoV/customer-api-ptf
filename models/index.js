// models/index.js
import { Sequelize } from 'sequelize';
import sequelize from '../config/db.js';

// Importar todos los modelos
import User from './user.model.js';
import Token from './token.model.js';
import City from './city.model.js';
import Seller from './seller.model.js';
import Customer from './customer.model.js';

const db = {
  Sequelize,
  sequelize,
  User,
  Token,
  City,
  Seller,
  Customer
};

// Configurar relaciones entre modelos

// Relación Usuario-Token (1 a muchos)
User.hasMany(Token, {
  foreignKey: 'USER_ID',
  as: 'tokens'
});
Token.belongsTo(User, {
  foreignKey: 'USER_ID',
  as: 'user'
});

// Relación Ciudad-Cliente (1 a muchos)
City.hasMany(Customer, {
  foreignKey: 'CITY_ID',
  as: 'customers'
});
Customer.belongsTo(City, {
  foreignKey: 'CITY_ID',
  as: 'city'
});

// Relación Vendedor-Cliente (1 a muchos)
Seller.hasMany(Customer, {
  foreignKey: 'SELLER_ID',
  as: 'customers'
});

Customer.belongsTo(Seller, {
  foreignKey: 'SELLER_ID',
  as: 'seller'
});

// Exportar todos los modelos y Sequelize
export {
  Sequelize,
  sequelize,
  User,
  Token,
  City,
  Seller,
  Customer
};

export default db;