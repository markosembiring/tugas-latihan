const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('Item', {
    item_name: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock_qty: DataTypes.INTEGER,
    min_stock: DataTypes.INTEGER, // Batas minimum stok [cite: 9]
    storage_location: DataTypes.STRING,
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true // Default 1 (Aktif) [cite: 10]
    },
    created_by: DataTypes.STRING, // Audit Trail [cite: 10]
    updated_by: DataTypes.STRING  // Audit Trail [cite: 10]
}, {
    timestamps: true, // Menangani created_at dan updated_at 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Item;