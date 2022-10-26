const resourceService = require('../_services/resource.service');

exports.create = (req, res, next) => {
    resourceService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    resourceService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var resource = resourceService.get(req.params.id);
    res.status(201).json(resource);
};

exports.getAll = (req, res, next) => {
    var companies = resourceService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    resourceService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};