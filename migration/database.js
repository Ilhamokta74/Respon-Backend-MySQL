const { Sequelize } = require('sequelize');

// Ganti dengan detail koneksi Anda
const sequelize = new Sequelize('migrate', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
