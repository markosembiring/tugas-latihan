const { Sequelize } = require('sequelize');

// Sesuaikan dengan user/pass database lokal Anda
const sequelize = new Sequelize('inventory_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;