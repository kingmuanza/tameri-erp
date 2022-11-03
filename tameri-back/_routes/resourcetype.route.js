const express = require('express');
const router = express.Router();
const resourcetypeCtrl = require('../_controlers/resourcetype.ctrl');

router.get('/', resourcetypeCtrl.getAll);
router.post('/', resourcetypeCtrl.create);
router.get('/:id', resourcetypeCtrl.get);
router.put('/:id', resourcetypeCtrl.modify);
router.delete('/:id', resourcetypeCtrl.delete);

module.exports = router;