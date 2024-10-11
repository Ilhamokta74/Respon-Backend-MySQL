const connection = require(`./Connection/connection`)
const { v4: uuidv4 } = require('uuid');

const hapus = async (req, res) => {
    const uuid = req.query.uuid;

    const queriDokter = `DELETE FROM dokter WHERE uuid = "${uuid}"`;

    try {
        connection.query(queriDokter, (error, results1) => {
            if (error) {
                return res.status(500).json({
                    statusCode: 500,
                    status: "error",
                    message: "Gagal Hapus data Dokter",
                });
            }

            if (results1.affectedRows === 0) {
                return res.status(404).json({
                    statusCode: 404,
                    status: "Error",
                    message: "Data Dokter tidak ditemukan",
                });
            }

            res.json({
                statusCode: 200,
                status: "success",
                data: "Data Dokter berhasil Hapus"
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
    const queriDokter = `SELECT * FROM dokter`;

    try {
        connection.query(queriDokter, (Error, result) => {
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
                data: result
            });
        });
    } catch (Error) {
        return res.status(500).json({
            statusCode: 500,
            status: "Error",
            message: "Terjadi kesalahan pada server.",
        });
    }
}

const add = async (req, res) => {
    const puskesmasId = req.query.puskesmasId;
    const { namaDokter, poli, jamPraktek, jadwalPraktek } = req.body;

    const uuid = uuidv4();

    const queriDokter = `INSERT INTO dokter (uuid, namaDokter, poli, jamPraktek, jadwalPraktek, puskesmasId )
        VALUES ("${uuid}", "${namaDokter}", "${poli}", "${jamPraktek}", "${jadwalPraktek}", ${puskesmasId});
    `;

    const queriPuskesmas = `SELECT id FROM puskesmas WHERE id=${puskesmasId}`

    try {
        connection.query(queriPuskesmas, (Error, results1) => {
            if (Error) {
                return res.status(500).json({
                    statusCode: 500,
                    status: "Error",
                    message: "Data Puskesmas Tidak Di Temukan",
                });
            }

            if (results1.length === 0) {
                return res.status(404).json({
                    statusCode: 404,
                    status: "Error",
                    message: "Data Puskesmas tidak ditemukan",
                });
            }

            connection.query(queriDokter, (Error, results1) => {
                if (Error) {
                    return res.status(500).json({
                        statusCode: 500,
                        status: "Error",
                        message: "Gagal Tambah data Dokter",
                    });
                }

                res.json({
                    statusCode: 200,
                    status: "Success",
                    message: "Data Dokter berhasil ditambahkan",
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
}

const update = async (req, res) => {
    const uuid = req.query.uuid;
    const { namaDokter, poli, jamPraktek, jadwalPraktek } = req.body;

    const queriDokter = `UPDATE dokter
        SET namaDokter = "${namaDokter}", 
        poli = "${poli}",
        jamPraktek = "${jamPraktek}",
        jadwalPraktek = "${jadwalPraktek}"
        WHERE uuid = "${uuid}";
    `;

    try {
        connection.query(queriDokter, (Error, results1) => {
            if (Error) {
                return res.status(500).json({
                    statusCode: 500,
                    status: "Error",
                    message: "Gagal Update data Dokter",
                });
            }

            if (results1.affectedRows === 0) {
                return res.status(404).json({
                    statusCode: 404,
                    status: "error",
                    message: "Data Dokter tidak ditemukan",
                });
            }

            res.json({
                statusCode: 200,
                status: "Success",
                data: "Data Dokter berhasil diperbarui"
            });
        });
    } catch (Error) {
        return res.status(500).json({
            statusCode: 500,
            status: "Error",
            message: "Terjadi kesalahan pada server.",
        });
    }
}

// const hapusAll = async (req, res) => {
//     try {
//         const { puskesmasId } = req.query
//         const { data, error } = await supabase
//             .from('dokter')
//             .delete()
//             .eq('puskesmasId', puskesmasId)
//         if (error) {
//             return res.json(error)
//         }

//         res.json(data)
//     } catch (error) {
//         return res.json(error)
//     }
// }

// const listInti = async (req, res) => {
//     try {
//         const { id } = req.query
//         const { data, error } = await supabase
//             .from('dokter')
//             .select('*')
//             .eq('id', id)
//         if (error) {
//             return res.json(error)
//         }

//         res.json(data)
//     } catch (error) {
//         return res.json(error)
//     }
// }

module.exports = {
    add, hapus, update, list, // hapusAll, listInti,
}
