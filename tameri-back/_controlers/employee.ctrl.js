const employeeService = require('../_services/employee.service');

exports.create = (req, res, next) => {
    employeeService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    employeeService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });
    });
};

exports.get = (req, res, next) => {
    employeeService.get(req.params.id).then((employee) => {
        console.log('employee');
        console.log(employee);
        res.status(201).json(employee);
    });
};

exports.getAll = (req, res, next) => {
    employeeService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    employeeService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};