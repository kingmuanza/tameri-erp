const express = require('express');
const router = express.Router();
const supplierCtrl = require('../_controlers/supplier.ctrl');

router.get('/', supplierCtrl.getAll);
router.post('/', supplierCtrl.create);
router.get('/:id', supplierCtrl.get);
router.put('/:id', supplierCtrl.modify);
router.delete('/:id', supplierCtrl.delete);

module.exports = router;