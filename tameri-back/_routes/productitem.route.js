const express = require('express');
const router = express.Router();
const productitemCtrl = require('../_controlers/productitem.ctrl');

router.get('/', productitemCtrl.getAll);
router.post('/', productitemCtrl.create);
router.get('/:id', productitemCtrl.get);
router.put('/:id', productitemCtrl.modify);
router.delete('/:id', productitemCtrl.delete);

module.exports = router;