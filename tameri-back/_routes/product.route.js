const express = require('express');
const router = express.Router();
const productCtrl = require('../_controlers/product.ctrl');

router.get('/', productCtrl.getAll);
router.post('/', productCtrl.create);
router.get('/:id', productCtrl.get);
router.put('/:id', productCtrl.modify);
router.delete('/:id', productCtrl.delete);

module.exports = router;