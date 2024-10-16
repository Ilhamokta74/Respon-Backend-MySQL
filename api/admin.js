const connection = require(`./Connection/connection`)
const { v4: uuidv4 } = require('uuid');

const { hashPassword, comparePasswords } = require(`./middleware/authentication`)
const { accessToken } = require(`./middleware/authorization`)

const add = async (req, res) => {
    const { nama, username, email, password } = req.body;

    // Validasi input
    if (!nama || !username || !email || !password) {
        return res.status(400).json({
            statusCode: 400,
            status: "Error",
            message: "Semua field harus diisi",
        });
    }

    const uuid = uuidv4();
    const passwordHash = await hashPassword(password)

    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format date
    const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format date

    const queriAccount = `INSERT INTO account (uuid, nama, username, email, password, created_at, updated_at )
        VALUES ("${uuid}", "${nama}", "${username}", "${email}", "${passwordHash}", "${created_at}", "${updated_at}");
    `;

    try {
        connection.query(queriAccount, (Error, results1) => {
            if (Error) {
                if (Error.sqlMessage.includes('Duplicate')) {
                    return res.status(409).json({
                        statusCode: 409,
                        status: "Error",
                        message: "Email atau Username sudah digunakan",
                    });
                }
                return res.status(500).json({
                    statusCode: 500,
                    status: "Error",
                    message: "Gagal menambah akun",
                });
            }

            res.json({
                statusCode: 200,
                status: "Success",
                message: "Data Account berhasil ditambahkan",
            });
        });
    } catch (Error) {
        return res.status(500).json({
            statusCode: 500,
            status: "Error",
            message: "Terjadi kesalahan pada server.",
        });
    }
};

const hapus = async (req, res) => {
    const uuid = req.query.uuid;

    const queriDeleteAccount = `DELETE FROM account WHERE uuid = "${uuid}"`;

    try {
        connection.query(queriDeleteAccount, (error, results1) => {
            if (error) {
                return res.status(500).json({
                    statusCode: 500,
                    status: "error",
                    message: "Gagal Hapus data",
                });
            }

            if (results1.affectedRows === 0) {
                return res.status(404).json({
                    statusCode: 404,
                    status: "Error",
                    message: "Data tidak ditemukan",
                });
            }

            res.json({
                statusCode: 200,
                status: "success",
                data: "Data berhasil Hapus"
            });
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            status: "error",
            message: "Terjadi kesalahan pada server.",
        });
    }
};

const list = async (req, res) => {
    const queriAccount = `SELECT * FROM account`;

    try {
        connection.query(queriAccount, (Error, results) => {
            if (Error) {
                return res.status(500).json({
                    statusCode: 500,
                    status: "Error",
                    message: "Gagal mengambil data Dokter",
                });
            }

            res.json({
                statusCode: 200,
                status: "Success",
                data: results
            });
        });
    } catch (Error) {
        return res.status(500).json({
            statusCode: 500,
            status: "Error",
            message: "Terjadi kesalahan pada server.",
        });
    }
};

const update = async (req, res) => {
    const uuid = req.query.uuid;
    const { nama, username, email, password } = req.body;

    const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format date

    // Password Tidak Di Ganti
    const queriUpdateAccount = `UPDATE account
        SET nama = "${nama}", 
        username = "${username}",
        email = "${email}",
        updated_at = "${updated_at}"
        WHERE uuid = "${uuid}";
    `;

    // Jika password di-update, hash ulang password
    if (password) {
        const passwordHash = await hashPassword(password);
        queriUpdateAccount = `UPDATE account
                SET nama = "${nama}", 
                username = "${username}",
                email = "${email}",
                password = "${passwordHash}"
                updated_at = "${updated_at}"
                WHERE uuid = "${uuid}";
        `;
    }

    try {
        connection.query(queriUpdateAccount, (Error, results1) => {
            if (Error) {
                return res.status(500).json({
                    statusCode: 500,
                    status: "Error",
                    message: "Gagal Update data",
                    error: Error
                });
            }

            if (results1.affectedRows === 0) {
                return res.status(404).json({
                    statusCode: 404,
                    status: "error",
                    message: "Data tidak ditemukan",
                });
            }

            res.json({
                statusCode: 200,
                status: "Success",
                data: "Data berhasil diperbarui"
            });
        });
    } catch (Error) {
        return res.status(500).json({
            statusCode: 500,
            status: "Error",
            message: "Terjadi kesalahan pada server.",
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            statusCode: 400,
            status: "Error",
            message: "Email dan password harus diisi",
        });
    }

    const queriAccount = `SELECT * FROM account WHERE email="${email}"`;

    try {
        connection.query(queriAccount, async (Error, results) => {
            if (Error) {
                return res.status(500).json({
                    statusCode: 500,
                    status: "Error",
                    message: "Gagal mengambil data Account",
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    statusCode: 404,
                    status: "Error",
                    message: "Akun tidak ditemukan",
                });
            }

            const cekPassword = await comparePasswords(password, results[0].password)

            // Membuat token
            const token = accessToken(results[0].email);

            if (cekPassword) {
                res.json({
                    statusCode: 200,
                    status: "Success",
                    accessToken: token,
                    expiresIn: 3600
                });
            } else {
                return res.status(401).json({
                    statusCode: 401,
                    status: "Error",
                    message: "Password salah",
                });
            }

        });
    } catch (Error) {
        return res.status(500).json({
            statusCode: 500,
            status: "Error",
            message: "Terjadi kesalahan pada server.",
        });
    }
};

module.exports = {
    add, hapus, list, update, login
}