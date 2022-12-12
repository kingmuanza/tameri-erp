const pricingService = require('../_services/pricing.service');

exports.create = (req, res, next) => {
    pricingService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    pricingService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    pricingService.get(req.params.id).then((pricing) => {
        console.log('pricing');
        console.log(pricing);
        res.status(201).json(pricing);
    });
};

exports.getAll = (req, res, next) => {
    pricingService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    pricingService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};