const connection = require(`./Connection/connection`)

const add = async (req, res) => {
    const { namaPuskesmas, alamatPuskesmas, noTelepon, maps, region } = req.body;

    // Validasi: Pastikan semua field terisi
    if (!namaPuskesmas || !alamatPuskesmas || !noTelepon || !maps || !region) {
        return res.status(400).json({
            statusCode: 400,
            status: "Error",
            message: "All fields must be filled.", // Pesan error dalam bahasa Inggris
        });
    }

    // Validasi: Nomor telepon harus berupa angka
    if (isNaN(noTelepon)) {
        return res.status(400).json({
            statusCode: 400,
            status: "Error",
            message: "Phone number must be a number.", // Pesan error dalam bahasa Inggris
        });
    }

    // Query untuk menambahkan data Puskesmas ke database
    const queriAddPuskesmas = `INSERT INTO puskesmas (id, namaPuskesmas, alamatPuskesmas, noTelepon, maps, region)
        VALUES (NULL, "${namaPuskesmas}", "${alamatPuskesmas}", ${noTelepon}, "${maps}", "${region}");`;

    try {
        // Eksekusi query untuk menambahkan data ke database
        connection.query(queriAddPuskesmas, (Error, results) => {
            // Jika terjadi kesalahan saat query
            if (Error) {
                return res.status(500).json({
                    statusCode: 500,
                    status: "Error",
                    message: "Failed to add Puskesmas data.", // Pesan error dalam bahasa Inggris
                });
            }

            // Jika berhasil, kembalikan respons sukses dengan data yang ditambahkan
            res.json({
                statusCode: 200,
                status: "Success",
                message: "Puskesmas data added successfully.", // Pesan sukses dalam bahasa Inggris
                Data: [
                    {
                        "namaPuskesmas": namaPuskesmas,
                        "alamatPuskesmas": alamatPuskesmas,
                        "noTelepon": noTelepon,
                        "maps": maps,
                        "region": region,
                    }
                ]
            });
        });
    } catch (Error) {
        // Jika terjadi kesalahan server
        return res.status(500).json({
            statusCode: 500,
            status: "Error",
            message: "Server error occurred.", // Pesan error dalam bahasa Inggris
        });
    }
};

const hapus = async (req, res) => {
    const id = req.query.id;

    // Validasi: Pastikan ID disediakan dan berupa angka
    if (!id || isNaN(id)) {
        return res.status(400).json({
            statusCode: 400,
            status: "Error",
            message: "Invalid Puskesmas ID",
        });
    }

    // Query untuk menghapus data dari tabel dokter dan puskesmas
    const queriPuskesmas = `DELETE FROM puskesmas WHERE id = ?`;
    const queriDokter = `DELETE FROM dokter WHERE puskesmasId = ?`;

    try {
        // Hapus data dokter terkait puskesmas
        connection.query(queriDokter, [id], (error, results) => {
            if (error) {
                return res.status(500).json({
                    statusCode: 500,
                    status: "Error",
                    message: "Failed to delete related doctor data.", // Pesan error penghapusan dokter
                });
            }

            // Hapus data puskesmas
            connection.query(queriPuskesmas, [id], (error, results1) => {
                if (error) {
                    return res.status(500).json({
                        statusCode: 500,
                        status: "Error",
                        message: "Failed to delete Puskesmas data.", // Pesan error penghapusan puskesmas
                    });
                }

                // Cek apakah ada data yang dihapus
                if (results1.affectedRows === 0) {
                    return res.status(404).json({
                        statusCode: 404,
                        status: "Error",
                        message: "Puskesmas data not found.", // Pesan jika data tidak ditemukan
                    });
                }

                // Respons sukses jika data berhasil dihapus
                res.json({
                    statusCode: 200,
                    status: "Success",
                    message: "Puskesmas data deleted successfully.", // Pesan sukses
                });
            });
        });
    } catch (error) {
        // Handling error server
        return res.status(500).json({
            statusCode: 500,
            status: "Error",
            message: "Server error occurred.", // Pesan error server
        });
    }
};

const list = async (req, res) => {
    const queriPuskesmas = `SELECT * FROM puskesmas`;
    const queriDokter = `SELECT * FROM dokter`;

    try {
        connection.query(queriPuskesmas, (Error, results1) => {
            if (Error) {
                return res.status(500).json({
                    statusCode: 500,
                    status: "Error",
                    message: "Gagal mengambil data Puskesmas",
                });
            }

            connection.query(queriDokter, (Error, results2) => {
                if (Error) {
                    return res.status(500).json({
                        statusCode: 500,
                        status: "Error",
                        message: "Gagal mengambil data Dokter",
                    });
                }

                let datas = [];
                let datasDokter = [];

                for (let i = 0; i < results1.length; i++) {
                    datas.push(results1[i]);
                    for (let j = 0; j < results2.length; j++) {
                        if (results1[i].id == results2[j].puskesmasId) {
                            datasDokter.push(results2[j])
                        }
                    }
                    datas[i].dataDokter = datasDokter;
                    datasDokter = [];
                }

                res.json({
                    statusCode: 200,
                    status: "Success",
                    data: datas
                });
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

const search = async (req, res) => {
    const namaPuskesmas = req.body;

    // Validasi: Pastikan namaPuskesmas tidak kosong
    if (namaPuskesmas === "") {
        return res.status(400).json({
            statusCode: 400,
            status: "Error",
            message: "Nama Puskesmas harus diisi.",
        });
    }

    const queriPuskesmas = `SELECT * FROM puskesmas WHERE namaPuskesmas LIKE "%${namaPuskesmas.namaPuskesmas}%"`;
    const queriDokter = `SELECT * FROM dokter`;

    try {
        connection.query(queriPuskesmas, (Error, results1) => {
            if (Error) {
                return res.status(500).json({
                    statusCode: 500,
                    status: "Error",
                    message: "Gagal mengambil data Puskesmas",
                });
            }

            connection.query(queriDokter, (Error, results2) => {
                if (Error) {
                    return res.status(500).json({
                        statusCode: 500,
                        status: "Error",
                        message: "Gagal mengambil data Dokter",
                    });
                }

                let datas = [];
                let datasDokter = [];

                for (let i = 0; i < results1.length; i++) {
                    datas.push(results1[i]);
                    for (let j = 0; j < results2.length; j++) {
                        if (results1[i].id == results2[j].puskesmasId) {
                            datasDokter.push(results2[j])
                        }
                    }
                    datas[i].dataDokter = datasDokter;
                    datasDokter = [];
                }

                if (datas.length != 0) {
                    res.json({
                        statusCode: 200,
                        status: "Success",
                        data: datas
                    });
                } else {
                    return res.status(404).json({
                        statusCode: 404,
                        status: "Error",
                        message: "Tidak ada data yang ditemukan" // Pesan lebih jelas
                    });
                }
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
    const id = req.query.id;
    const { namaPuskesmas, alamatPuskesmas, noTelepon, maps, region } = req.body;

     // Validasi input: Pastikan semua field terisi dan valid
     if (!namaPuskesmas || !alamatPuskesmas || !noTelepon || !maps || !region) {
        return res.status(400).json({
            statusCode: 400,
            status: "Error",
            message: "Semua field wajib diisi",
        });
    }

    // Validasi: noTelepon harus angka
    if (isNaN(noTelepon)) {
        return res.status(400).json({
            statusCode: 400,
            status: "Error",
            message: "Nomor telepon harus berupa angka",
        });
    }

    const queriPuskesmas = `UPDATE puskesmas
        SET namaPuskesmas = "${namaPuskesmas}", 
        alamatPuskesmas = "${alamatPuskesmas}",
        noTelepon = ${noTelepon},
        maps = "${maps}",
        region = "${region}"
        WHERE id = ${id};
    `;

    try {
        connection.query(queriPuskesmas, (Error, results1) => {
            if (Error) {
                return res.status(500).json({
                    statusCode: 500,
                    status: "Error",
                    message: "Gagal Update data Puskesmas",
                });
            }

            if (results1.affectedRows === 0) {
                return res.status(404).json({
                    statusCode: 404,
                    status: "Error",
                    message: "Puskesmas data not found.", // Data tidak ditemukan
                });
            }

            res.json({
                statusCode: 200,
                status: "Success",
                data: "Data Puskesmas berhasil diperbarui"
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

module.exports = {
    add, hapus, list, search, update
}