const express = require('express');
const router = express.Router();
const communitytypeCtrl = require('../_controlers/communitytype.ctrl');

router.get('/', communitytypeCtrl.getAll);
router.post('/', communitytypeCtrl.create);
router.get('/:id', communitytypeCtrl.get);
router.put('/:id', communitytypeCtrl.modify);
router.delete('/:id', communitytypeCtrl.delete);

module.exports = router;