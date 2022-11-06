const express = require('express');
const router = express.Router();
const purchaseCtrl = require('../_controlers/purchase.ctrl');

router.get('/', purchaseCtrl.getAll);
router.post('/', purchaseCtrl.create);
router.get('/:id', purchaseCtrl.get);
router.put('/:id', purchaseCtrl.modify);
router.delete('/:id', purchaseCtrl.delete);

module.exports = router;