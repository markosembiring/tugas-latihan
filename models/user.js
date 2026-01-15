const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: { // Menyimpan role 'manager' atau 'admin' [cite: 14, 15]
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;