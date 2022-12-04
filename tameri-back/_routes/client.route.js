const express = require('express');
const router = express.Router();
const clientCtrl = require('../_controlers/client.ctrl');

router.get('/', clientCtrl.getAll);
router.post('/', clientCtrl.create);
router.get('/:id', clientCtrl.get);
router.put('/:id', clientCtrl.modify);
router.delete('/:id', clientCtrl.delete);

module.exports = router;