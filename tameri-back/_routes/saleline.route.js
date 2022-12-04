const express = require('express');
const router = express.Router();
const salelineCtrl = require('../_controlers/saleline.ctrl');

router.get('/', salelineCtrl.getAll);
router.post('/', salelineCtrl.create);
router.get('/:id', salelineCtrl.get);
router.put('/:id', salelineCtrl.modify);
router.delete('/:id', salelineCtrl.delete);

module.exports = router;