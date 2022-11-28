const countryService = require('../_services/country.service');

exports.create = (req, res, next) => {
    countryService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    countryService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var country = countryService.get(req.params.id);
    res.status(201).json(country);
};

exports.getAll = (req, res, next) => {
    var companies = countryService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    countryService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};