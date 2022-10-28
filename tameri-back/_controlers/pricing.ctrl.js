const pricingService = require('../_services/pricing.service');

exports.create = (req, res, next) => {
    pricingService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    pricingService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var pricing = pricingService.get(req.params.id);
    res.status(201).json(pricing);
};

exports.getAll = (req, res, next) => {
    var companies = pricingService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    pricingService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};