const resourcetypeService = require('../_services/resourcetype.service');

exports.create = (req, res, next) => {
    resourcetypeService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    resourcetypeService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var resourcetype = resourcetypeService.get(req.params.id);
    res.status(201).json(resourcetype);
};

exports.getAll = (req, res, next) => {
    var companies = resourcetypeService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    resourcetypeService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};