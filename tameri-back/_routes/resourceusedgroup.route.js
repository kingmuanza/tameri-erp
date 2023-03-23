const express = require('express');
const router = express.Router();
const resourceusedgroupCtrl = require('../_controlers/resourceusedgroup.ctrl');

router.get('/', resourceusedgroupCtrl.getAll);
router.post('/', resourceusedgroupCtrl.create);
router.get('/:id', resourceusedgroupCtrl.get);
router.put('/:id', resourceusedgroupCtrl.modify);
router.delete('/:id', resourceusedgroupCtrl.delete);

module.exports = router;