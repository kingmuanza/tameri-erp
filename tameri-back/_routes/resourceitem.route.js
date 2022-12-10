const express = require('express');
const router = express.Router();
const resourceitemCtrl = require('../_controlers/resourceitem.ctrl');

router.get('/', resourceitemCtrl.getAll);
router.post('/', resourceitemCtrl.create);
router.get('/:id', resourceitemCtrl.get);
router.put('/:id', resourceitemCtrl.modify);
router.delete('/:id', resourceitemCtrl.delete);

module.exports = router;