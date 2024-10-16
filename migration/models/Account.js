// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Account = sequelize.define('Account', {
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // createdAt: {
    //     type: DataTypes.TIME,
    //     allowNull: false,
    // },
    // updatedAt: {
    //     type: DataTypes.TIME,
    //     allowNull: false,
    // },
    // Tambahkan kolom lain sesuai kebutuhan
}, {
    tableName: 'account', // Nama tabel di database
});

module.exports = Account;
