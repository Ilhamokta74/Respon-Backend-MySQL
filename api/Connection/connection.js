// Import mysql2
const mysql = require('mysql2');

// Buat koneksi ke database MySQL
const connection = mysql.createConnection({
    host: 'localhost',    // Host tempat MySQL berjalan
    user: 'root',         // Nama pengguna MySQL
    password: '',         // Kata sandi pengguna MySQL
    database: 'respon'   // Nama database
});

// Hubungkan ke MySQL
connection.connect((err) => {
    if (err) {
        console.error('Gagal terhubung ke database:', err.message);
        return;
    }
    console.log('Berhasil terhubung ke database MySQL');
});

module.exports = connection;