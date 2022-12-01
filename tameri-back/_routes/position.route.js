const express = require('express');
const router = express.Router();
const positionCtrl = require('../_controlers/position.ctrl');

router.get('/', positionCtrl.getAll);
router.post('/', positionCtrl.create);
router.get('/:id', positionCtrl.get);
router.put('/:id', positionCtrl.modify);
router.delete('/:id', positionCtrl.delete);

module.exports = router;