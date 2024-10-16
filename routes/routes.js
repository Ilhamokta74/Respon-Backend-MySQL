const express = require('express');
const router = express.Router();

// const pasien = require('../api/fitur/pasien');
// const staff = require('../api/fitur/staff');
// const joinTable = require('../api/fitur/joinTable');
// const message = require('../api/fitur/message');

const puskesmas = require('../api/puskesmas');
const dokter = require('../api/dokter');
const admin = require('../api/admin');

const { authenticateToken } = require('../api/middleware/authorization');

// Home page
router.get('/', (req, res) => {
    res.send('Selamat datang di API Puskesmas Jakarta raya');
});

// PUSKESMAS
router.get('/puskesmas/list', puskesmas.list)
router.get('/puskesmas/list-detail', puskesmas.listDetail)
router.get(`/puskesmas/search`, puskesmas.search)
router.post('/puskesmas/add', authenticateToken, puskesmas.add)
router.put('/puskesmas/update', authenticateToken, puskesmas.update)
router.delete('/puskesmas/delete', authenticateToken, puskesmas.hapus)

// DOKTER
router.get('/dokter/list', dokter.list)
router.post('/dokter/add', authenticateToken, dokter.add)
router.delete('/dokter/delete', authenticateToken, dokter.hapus)
router.put('/dokter/update', authenticateToken, dokter.update)
// router.get('/dokter/listInti', dokter.listInti)
// router.delete('/dokter/deleteAll', dokter.hapusAll)

// ADMIN
router.post('/admin/add', admin.add)
router.get('/admin/list', authenticateToken, admin.list)
router.put('/admin/update', authenticateToken, admin.update)
router.delete('/admin/delete', authenticateToken, admin.hapus)

router.post(`/admin/login`, admin.login)


// ======================================== FItur ===========================

// // PASIEN
// router.post('/pasien/add', pasien.add)
// router.get('/pasien/list', pasien.list)
// router.put('/pasien/update', pasien.update)
// router.delete('/pasien/delete', pasien.hapus)

// // STAFF
// router.post('/staff/add', staff.add)
// router.get('/staff/list', staff.list)
// router.put('/staff/update', staff.update)
// router.delete('/staff/delete', staff.hapus)

// //MESSAGE
// router.post('/message/add', message.add)
// router.get('/message/list', message.list)
// router.get('/message/listInti', message.listInti)
// router.delete('/message/delete', message.hapus)

// // JOIN TABLE
// router.get('/table/list', joinTable.list)

module.exports = router
