const express = require('express');
const router = express.Router();
const countryCtrl = require('../_controlers/country.ctrl');

router.get('/', countryCtrl.getAll);
router.post('/', countryCtrl.create);
router.get('/:id', countryCtrl.get);
router.put('/:id', countryCtrl.modify);
router.delete('/:id', countryCtrl.delete);

module.exports = router;