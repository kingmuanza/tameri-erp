const resourcepackService = require('../_services/resourcepack.service');

exports.create = (req, res, next) => {
    resourcepackService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    resourcepackService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var resourcepack = resourcepackService.get(req.params.id);
    res.status(201).json(resourcepack);
};

exports.getAll = (req, res, next) => {
    var companies = resourcepackService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    resourcepackService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};