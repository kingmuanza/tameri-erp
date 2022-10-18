const express = require('express');
const router = express.Router();
const testCtrl = require('../_controlers/test.ctrl');

router.get('/:id', testCtrl.get);
router.get('/', testCtrl.getAll);
router.post('/', testCtrl.create);
router.put('/', testCtrl.modify);
router.delete('/', testCtrl.delete);

module.exports = router;