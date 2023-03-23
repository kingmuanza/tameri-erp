const express = require('express');
const router = express.Router();
const resourceusedCtrl = require('../_controlers/resourceused.ctrl');

router.get('/', resourceusedCtrl.getAll);
router.post('/', resourceusedCtrl.create);
router.get('/:id', resourceusedCtrl.get);
router.put('/:id', resourceusedCtrl.modify);
router.delete('/:id', resourceusedCtrl.delete);

module.exports = router;