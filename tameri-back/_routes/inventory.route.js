const express = require('express');
const router = express.Router();
const inventoryCtrl = require('../_controlers/inventory.ctrl');

router.get('/', inventoryCtrl.getAll);
router.post('/', inventoryCtrl.create);
router.get('/:id', inventoryCtrl.get);
router.put('/:id', inventoryCtrl.modify);
router.delete('/:id', inventoryCtrl.delete);

module.exports = router;