const express = require('express');
const router = express.Router();
const inventorygroupCtrl = require('../_controlers/inventorygroup.ctrl');

router.get('/', inventorygroupCtrl.getAll);
router.post('/', inventorygroupCtrl.create);
router.get('/:id', inventorygroupCtrl.get);
router.put('/:id', inventorygroupCtrl.modify);
router.delete('/:id', inventorygroupCtrl.delete);

module.exports = router;