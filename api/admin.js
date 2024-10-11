const connection = require(`./Connection/connection`)
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const { hashPassword, comparePasswords, accessToken } = require(`./middleware/middleware`)

const add = async (req, res) => {
    const { nama, username, email, password } = req.body;

    const uuid = uuidv4();
    const passwordHash = await hashPassword(password)

    const queriAccount = `INSERT INTO account (uuid, nama, username, email, password )
        VALUES ("${uuid}", "${nama}", "${username}", "${email}", "${passwordHash}");
    `;

    console.log(queriAccount);
    try {
        connection.query(queriAccount, (Error, results1) => {
            // if (Error.sqlMessage.includes('Duplicate')) {
            //     return res.status(500).json({
            //         statusCode: 500,
            //         status: "Error",
            //         message: "Email dan Username Telah Digunakan",
            //         data: results1
            //     });
            // }

            if (Error) {
                return res.status(500).json({
                    statusCode: 500,
                    status: "Error",
                    message: "Gagal Tambah data Account",
                    data: results1
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
    try {
        const { email } = req.body;

        // Check if token exists in headers
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "Tidak diizinkan. Token tidak ditemukan."
            });
        }

        // Verify the token
        jwt.verify(token, 'secretKey', async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    status: "error",
                    message: "Tidak diizinkan. Token tidak valid."
                });
            }

            // Token valid, continue with deletion
            try {
                // Check if data exists
                const { data: existingAdmin, error: existingError } = await supabase
                    .from('Admin')
                    .select('*')
                    .eq('email', email)
                    .single();

                if (!existingAdmin) {
                    return res.status(404).json({
                        status: "error",
                        message: "Data tidak ditemukan."
                    });
                }

                // Delete data
                const { data, error } = await supabase
                    .from('Admin')
                    .delete()
                    .eq('email', email);

                if (error) {
                    return res.status(500).json({
                        status: "error",
                        message: "Gagal menghapus data. Silakan coba lagi."
                    });
                }

                res.json({
                    status: "success",
                    message: "Data berhasil dihapus."
                });

            } catch (error) {
                return res.status(500).json({
                    status: "error",
                    message: "Terjadi kesalahan pada server."
                });
            }
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Terjadi kesalahan pada server."
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
    try {
        // Check if token exists in headers
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "Tidak diizinkan. Token tidak ditemukan."
            });
        }

        // Verify the token
        jwt.verify(token, 'secretKey', async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    status: "error",
                    message: "Tidak diizinkan. Token tidak valid."
                });
            }

            // Token valid, continue with deletion
            try {
                const { nama, username, email, password } = req.body;

                // Check if the data with the given email exists
                const { data: existingAdmin, error: existingError } = await supabase
                    .from('Admin')
                    .select('*')
                    .eq('email', email)
                    .single();

                if (!existingAdmin) {
                    return res.status(404).json({
                        status: "error",
                        message: "Data tidak ditemukan."
                    });
                }

                // Hash new password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Perform update operation
                const { data: updatedData, error: updateError } = await supabase
                    .from('Admin')
                    .update({ nama, username, password: hashedPassword, updatedAt: new Date().toISOString() })
                    .eq('email', email);

                if (updateError) {
                    return res.status(500).json({
                        status: "error",
                        message: "Gagal melakukan pembaruan data. Silakan coba lagi."
                    });
                }

                res.json({
                    status: "success",
                    message: "Data berhasil diperbarui.",
                    updatedData
                });
            } catch (error) {
                return res.status(500).json({
                    status: "error",
                    message: "Terjadi kesalahan pada server."
                });
            }
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Terjadi kesalahan pada server."
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const queriAccount = `SELECT * FROM account WHERE email="${email}"`;

    try {
        connection.query(queriAccount, async (Error, results) => {
            if (Error) {
                return res.status(500).json({
                    statusCode: 500,
                    status: "Error",
                    message: "Gagal mengambil data Dokter",
                });
            }

            const cekPassword = await comparePasswords(password, results[0].password)

            // Membuat token
            const token = jwt.sign(results[0].email, results[0].password);

            if (cekPassword) {
                res.json({
                    statusCode: 200,
                    status: "Success",
                    accessToken: token
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