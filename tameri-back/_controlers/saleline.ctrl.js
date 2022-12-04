const salelineService = require('../_services/saleline.service');

exports.create = (req, res, next) => {
    salelineService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    salelineService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var saleline = salelineService.get(req.params.id);
    res.status(201).json(saleline);
};

exports.getAll = (req, res, next) => {
    var companies = salelineService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    salelineService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};