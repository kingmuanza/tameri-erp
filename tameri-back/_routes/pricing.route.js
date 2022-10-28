const express = require('express');
const router = express.Router();
const pricingCtrl = require('../_controlers/pricing.ctrl');

router.get('/', pricingCtrl.getAll);
router.get('/:id', pricingCtrl.get);
router.post('/', pricingCtrl.create);
router.put('/:id', pricingCtrl.modify);
router.delete('/:id', pricingCtrl.delete);

module.exports = router;