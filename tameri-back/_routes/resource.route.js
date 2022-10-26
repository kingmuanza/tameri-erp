const express = require('express');
const router = express.Router();
const resourceCtrl = require('../_controlers/resource.ctrl');

router.get('/', resourceCtrl.getAll);
router.post('/', resourceCtrl.create);
router.get('/:id', resourceCtrl.get);
router.put('/:id', resourceCtrl.modify);
router.delete('/:id', resourceCtrl.delete);

module.exports = router;