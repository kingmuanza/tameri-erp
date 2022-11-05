const supplierService = require('../_services/supplier.service');

exports.create = (req, res, next) => {
    supplierService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    supplierService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var supplier = supplierService.get(req.params.id);
    res.status(201).json(supplier);
};

exports.getAll = (req, res, next) => {
    var companies = supplierService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    supplierService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};