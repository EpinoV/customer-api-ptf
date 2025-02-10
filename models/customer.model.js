import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Customer = sequelize.define('Customer', {
    CUST_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    CUST_FIRST_NAME: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    CUST_LAST_NAME: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    CUST_EMAIL: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    CUST_DATE_OF_BIRTH: {
        type: DataTypes.DATE,
        allowNull: false
    },
    CUST_PHONE_NUMBER: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    CUST_ADDRESS: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    CITY_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    SELLER_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'CUSTOMER',
    timestamps: false
});
export default Customer;