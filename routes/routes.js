const express = require('express');
const router = express.Router();

const pasien = require('../api/pasien');
const staff = require('../api/staff');
const puskesmas = require('../api/puskesmas');
const dokter = require('../api/dokter');
const admin = require('../api/admin');
const joinTable = require('../api/joinTable');
const message = require('../api/message');

const accessToken = require('../api/middleware/middleware');

// Home page
router.get('/', (req, res) => {
    res.send('Selamat datang di API Puskesmas Jakarta raya');
});

// PASIEN
router.post('/pasien/add', pasien.add)
router.get('/pasien/list', pasien.list)
router.put('/pasien/update', pasien.update)
router.delete('/pasien/delete', pasien.hapus)

// STAFF
router.post('/staff/add', staff.add)
router.get('/staff/list', staff.list)
router.put('/staff/update', staff.update)
router.delete('/staff/delete', staff.hapus)

// PUSKESMAS
router.post('/puskesmas/add', puskesmas.add)
router.get('/puskesmas/list', puskesmas.list, accessToken)
router.put('/puskesmas/update', puskesmas.update)
router.delete('/puskesmas/delete', puskesmas.hapus)
router.get(`/puskesmas/search`, puskesmas.search)

// DOKTER
// router.get('/dokter/list', dokter.list)
// router.get('/dokter/listInti', dokter.listInti)
router.post('/dokter/add', dokter.add)
router.delete('/dokter/delete', dokter.hapus)
// router.delete('/dokter/deleteAll', dokter.hapusAll)
router.put('/dokter/update', dokter.update)

//MESSAGE
router.post('/message/add', message.add)
router.get('/message/list', message.list)
router.get('/message/listInti', message.listInti)
router.delete('/message/delete', message.hapus)

// ADMIN
router.post('/admin/add', admin.add)
router.get('/admin/list', admin.list)
router.put('/admin/update', admin.update)
router.delete('/admin/delete', admin.hapus)

router.post(`/admin/login`, admin.login)

// JOIN TABLE
router.get('/table/list', joinTable.list)

module.exports = router
