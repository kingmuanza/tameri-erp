const express = require('express');
const router = express.Router();
const producttypeCtrl = require('../_controlers/producttype.ctrl');

router.get('/', producttypeCtrl.getAll);
router.post('/', producttypeCtrl.create);
router.get('/:id', producttypeCtrl.get);
router.put('/:id', producttypeCtrl.modify);
router.delete('/:id', producttypeCtrl.delete);

module.exports = router;