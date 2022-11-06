const productitemService = require('../_services/productitem.service');

exports.create = (req, res, next) => {
    productitemService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    productitemService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var productitem = productitemService.get(req.params.id);
    res.status(201).json(productitem);
};

exports.getAll = (req, res, next) => {
    var companies = productitemService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    productitemService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};