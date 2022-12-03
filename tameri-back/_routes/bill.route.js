const express = require('express');
const router = express.Router();
const billCtrl = require('../_controlers/bill.ctrl');

router.get('/', billCtrl.getAll);
router.post('/', billCtrl.create);
router.get('/:id', billCtrl.get);
router.put('/:id', billCtrl.modify);
router.delete('/:id', billCtrl.delete);

module.exports = router;