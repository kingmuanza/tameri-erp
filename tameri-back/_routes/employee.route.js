const express = require('express');
const router = express.Router();
const employeeCtrl = require('../_controlers/employee.ctrl');

router.get('/', employeeCtrl.getAll);
router.post('/', employeeCtrl.create);
router.get('/:id', employeeCtrl.get);
router.put('/:id', employeeCtrl.modify);
router.delete('/:id', employeeCtrl.delete);

module.exports = router;