const express = require('express');
const router = express.Router();
const warehouseCtrl = require('../_controlers/warehouse.ctrl');

router.get('/', warehouseCtrl.getAll);
router.post('/', warehouseCtrl.create);
router.get('/:id', warehouseCtrl.get);
router.put('/:id', warehouseCtrl.modify);
router.delete('/:id', warehouseCtrl.delete);

module.exports = router;