const purchaseService = require('../_services/purchase.service');

exports.create = (req, res, next) => {
    purchaseService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    purchaseService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var purchase = purchaseService.get(req.params.id);
    res.status(201).json(purchase);
};

exports.getAll = (req, res, next) => {
    var companies = purchaseService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    purchaseService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};