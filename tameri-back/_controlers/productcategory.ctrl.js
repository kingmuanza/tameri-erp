const productcategoryService = require('../_services/productcategory.service');

exports.create = (req, res, next) => {
    productcategoryService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    productcategoryService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var productcategory = productcategoryService.get(req.params.id);
    res.status(201).json(productcategory);
};

exports.getAll = (req, res, next) => {
    var companies = productcategoryService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    productcategoryService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};