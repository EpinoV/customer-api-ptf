import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Seller = sequelize.define('Seller', {
    SELLER_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    SELLER_NAME: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    SELLER_EMAIL: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    SELLER_PHONE_NUMBER: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    SELLER_ADDRESS: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: 'SELLER',
    freezeTableName: true,
    timestamps: false
});
export default Seller;