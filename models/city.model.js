import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const City = sequelize.define('City', {
    CITY_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    CITY_NAME: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    }
}, {
    tableName: 'CITY',
    freezeTableName: true,
    timestamps: false
});
export default City;