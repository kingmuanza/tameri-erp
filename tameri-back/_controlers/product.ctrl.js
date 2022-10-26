const productService = require('../_services/product.service');

exports.create = (req, res, next) => {
    productService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    productService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var product = productService.get(req.params.id);
    res.status(201).json(product);
};

exports.getAll = (req, res, next) => {
    var companies = productService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    productService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};