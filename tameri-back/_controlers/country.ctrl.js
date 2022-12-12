const countryService = require('../_services/country.service');

exports.create = (req, res, next) => {
    countryService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    countryService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    countryService.get(req.params.id).then((country) => {
        console.log('country');
        console.log(country);
        res.status(201).json(country);
    });
};

exports.getAll = (req, res, next) => {
    countryService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    countryService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};