const express = require('express');
const router = express.Router();
const orderCtrl = require('../_controlers/order.ctrl');

router.get('/', orderCtrl.getAll);
router.post('/', orderCtrl.create);
router.get('/:id', orderCtrl.get);
router.put('/:id', orderCtrl.modify);
router.delete('/:id', orderCtrl.delete);

module.exports = router;