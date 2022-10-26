const express = require('express');
const router = express.Router();
const productpackCtrl = require('../_controlers/productpack.ctrl');

router.get('/', productpackCtrl.getAll);
router.post('/', productpackCtrl.create);
router.get('/:id', productpackCtrl.get);
router.put('/:id', productpackCtrl.modify);
router.delete('/:id', productpackCtrl.delete);

module.exports = router;