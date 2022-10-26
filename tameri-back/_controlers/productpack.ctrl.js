const productpackService = require('../_services/productpack.service');

exports.create = (req, res, next) => {
    productpackService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    productpackService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var productpack = productpackService.get(req.params.id);
    res.status(201).json(productpack);
};

exports.getAll = (req, res, next) => {
    var companies = productpackService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    productpackService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};