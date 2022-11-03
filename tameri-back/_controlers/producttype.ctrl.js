const producttypeService = require('../_services/producttype.service');

exports.create = (req, res, next) => {
    producttypeService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    producttypeService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var producttype = producttypeService.get(req.params.id);
    res.status(201).json(producttype);
};

exports.getAll = (req, res, next) => {
    var companies = producttypeService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    producttypeService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};