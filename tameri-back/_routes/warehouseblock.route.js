const express = require('express');
const router = express.Router();
const warehouseblockCtrl = require('../_controlers/warehouseblock.ctrl');

router.get('/', warehouseblockCtrl.getAll);
router.post('/', warehouseblockCtrl.create);
router.get('/:id', warehouseblockCtrl.get);
router.put('/:id', warehouseblockCtrl.modify);
router.delete('/:id', warehouseblockCtrl.delete);

module.exports = router;