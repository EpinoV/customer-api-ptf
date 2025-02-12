// models/user.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  USER_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  USER_NAME: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  EMAIL: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  PASSWORD: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  ROLE: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  CREATED: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  MODIFIED: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  LAST_LOGIN: {
    type: DataTypes.DATE
  },
  TOKEN: {
    type: DataTypes.STRING(200)
  },
  IS_ACTIVE: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'USERS',
  timestamps: false
});
export default User;