const express = require('express');
const router = express.Router();
const resourcepackCtrl = require('../_controlers/resourcepack.ctrl');

router.get('/', resourcepackCtrl.getAll);
router.post('/', resourcepackCtrl.create);
router.get('/:id', resourcepackCtrl.get);
router.put('/:id', resourcepackCtrl.modify);
router.delete('/:id', resourcepackCtrl.delete);

module.exports = router;