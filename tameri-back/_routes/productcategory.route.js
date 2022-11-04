const express = require('express');
const router = express.Router();
const productcategoryCtrl = require('../_controlers/productcategory.ctrl');

router.get('/', productcategoryCtrl.getAll);
router.post('/', productcategoryCtrl.create);
router.get('/:id', productcategoryCtrl.get);
router.put('/:id', productcategoryCtrl.modify);
router.delete('/:id', productcategoryCtrl.delete);

module.exports = router;