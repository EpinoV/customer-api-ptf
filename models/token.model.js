import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Token = sequelize.define('Token', {
    TOKEN_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    USER_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TOKEN: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    TOKEN_TYPE: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    REVOKED: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    EXPIRED: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'TOKEN',
    timestamps: false
});
export default Token;