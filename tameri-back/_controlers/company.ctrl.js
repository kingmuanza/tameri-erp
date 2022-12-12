const companyService = require('../_services/company.service');

exports.create = (req, res, next) => {
    companyService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    companyService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    companyService.get(req.params.id).then((company) => {
        console.log('company');
        console.log(company);
        res.status(201).json(company);
    });
};

exports.getAll = (req, res, next) => {
    companyService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    companyService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};