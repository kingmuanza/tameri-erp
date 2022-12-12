const supplierService = require('../_services/supplier.service');

exports.create = (req, res, next) => {
    supplierService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    supplierService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    supplierService.get(req.params.id).then((supplier) => {
        console.log('supplier');
        console.log(supplier);
        res.status(201).json(supplier);
    });
};

exports.getAll = (req, res, next) => {
    supplierService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    supplierService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};