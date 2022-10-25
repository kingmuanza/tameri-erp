const express = require('express');
const router = express.Router();
const authCtrl = require('../_controlers/auth.ctrl');

router.post('/create', authCtrl.create);
router.post('/connexion', authCtrl.connexion);
router.get('/verifylogin/:login', authCtrl.getAllByLogin);

router.get('/', authCtrl.getAll);
router.post('/', authCtrl.create);
router.get('/:id', authCtrl.get);
router.put('/:id', authCtrl.modify);
router.delete('/:id', authCtrl.delete);

module.exports = router;