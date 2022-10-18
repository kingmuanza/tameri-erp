const express = require('express');
const router = express.Router();
const communityCtrl = require('../_controlers/community.ctrl');

router.get('/', communityCtrl.getAll);
router.post('/', communityCtrl.create);
router.get('/:id', communityCtrl.get);
router.put('/:id', communityCtrl.modify);
router.delete('/:id', communityCtrl.delete);

module.exports = router;