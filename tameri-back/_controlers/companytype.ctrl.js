const companytypeService = require('../_services/companytype.service');

exports.create = (req, res, next) => {
    companytypeService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    companytypeService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var companytype = companytypeService.get(req.params.id);
    res.status(201).json(companytype);
};

exports.getAll = (req, res, next) => {
    var companies = companytypeService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    companytypeService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};