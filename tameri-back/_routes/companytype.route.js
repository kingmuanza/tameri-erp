const express = require('express');
const router = express.Router();
const companytypeCtrl = require('../_controlers/companytype.ctrl');

router.get('/', companytypeCtrl.getAll);
router.post('/', companytypeCtrl.create);
router.get('/:id', companytypeCtrl.get);
router.put('/:id', companytypeCtrl.modify);
router.delete('/:id', companytypeCtrl.delete);

module.exports = router;