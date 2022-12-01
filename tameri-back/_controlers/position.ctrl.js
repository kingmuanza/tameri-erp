const positionService = require('../_services/position.service');

exports.create = (req, res, next) => {
    positionService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    positionService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var position = positionService.get(req.params.id);
    res.status(201).json(position);
};

exports.getAll = (req, res, next) => {
    var companies = positionService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    positionService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};