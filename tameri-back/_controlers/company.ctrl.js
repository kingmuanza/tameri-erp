const companyService = require('../_services/company.service');

exports.create = (req, res, next) => {
    companyService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    companyService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var company = companyService.get(req.params.id);
    res.status(201).json(company);
};

exports.getAll = (req, res, next) => {
    var companies = companyService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    companyService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};