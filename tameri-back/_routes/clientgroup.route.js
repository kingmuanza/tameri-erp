const express = require('express');
const router = express.Router();
const clientgroupCtrl = require('../_controlers/clientgroup.ctrl');

router.get('/', clientgroupCtrl.getAll);
router.post('/', clientgroupCtrl.create);
router.get('/:id', clientgroupCtrl.get);
router.put('/:id', clientgroupCtrl.modify);
router.delete('/:id', clientgroupCtrl.delete);

module.exports = router;