const express = require('express');
const router = express.Router();
const orderlineCtrl = require('../_controlers/orderline.ctrl');

router.get('/', orderlineCtrl.getAll);
router.post('/', orderlineCtrl.create);
router.get('/:id', orderlineCtrl.get);
router.put('/:id', orderlineCtrl.modify);
router.delete('/:id', orderlineCtrl.delete);

module.exports = router;