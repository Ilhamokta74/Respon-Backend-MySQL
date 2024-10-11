const connection = require(`./Connection/connection`)

const add = async (req, res) => {
    const { namaPuskesmas, alamatPuskesmas, noTelepon, maps, region } = req.body;

    const queriPuskesmas = `INSERT INTO puskesmas (id, namaPuskesmas, alamatPuskesmas, noTelepon, maps, region )
        VALUES (NULL, "${namaPuskesmas}", "${alamatPuskesmas}", ${noTelepon}, "${maps}", "${region}");
    `;

    try {
        connection.query(queriPuskesmas, (Error, results1) => {
            if (Error) {
                return res.status(500).json({
                    statusCode: 500,
                    status: "Error",
                    message: "Gagal Tambah data Puskesmas",
                });
            }

            res.json({
                statusCode: 200,
                status: "Success",
                message: "Data Puskesmas berhasil ditambahkan",
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
    const id = req.query.id;

    const queriPuskesmas = `DELETE FROM puskesmas WHERE id = ${id}`;
    const queriDokter = `DELETE FROM dokter WHERE puskesmasId = ${id}`;

    try {
        connection.query(queriDokter, (error, results1) => {
            connection.query(queriPuskesmas, (error, results1) => {
                if (error) {
                    return res.status(500).json({
                        statusCode: 500,
                        status: "error",
                        message: "Gagal Hapus data Puskesmas",
                    });
                }
    
                if (results1.affectedRows === 0) {
                    return res.status(404).json({
                        statusCode: 404,
                        status: "Error",
                        message: "Data Puskesmas tidak ditemukan",
                    });
                }
    
                res.json({
                    statusCode: 200,
                    status: "success",
                    data: "Data Puskesmas berhasil Hapus"
                });
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
                    res.json({
                        statusCode: 200,
                        status: "Success",
                        data: "Tidak Ada Data Yang Ditemukan"
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