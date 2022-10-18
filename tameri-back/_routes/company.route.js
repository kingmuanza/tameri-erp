const express = require('express');
const router = express.Router();
const companyCtrl = require('../_controlers/company.ctrl');

router.get('/', companyCtrl.getAll);
router.post('/', companyCtrl.create);
router.get('/:id', companyCtrl.get);
router.put('/:id', companyCtrl.modify);
router.delete('/:id', companyCtrl.delete);

module.exports = router;