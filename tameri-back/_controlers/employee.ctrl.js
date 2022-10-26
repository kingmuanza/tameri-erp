const employeeService = require('../_services/employee.service');

exports.create = (req, res, next) => {
    employeeService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    employeeService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var employee = employeeService.get(req.params.id);
    res.status(201).json(employee);
};

exports.getAll = (req, res, next) => {
    var companies = employeeService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    employeeService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};