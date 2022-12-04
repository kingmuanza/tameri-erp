const clientService = require('../_services/client.service');

exports.create = (req, res, next) => {
    clientService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    clientService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var client = clientService.get(req.params.id);
    res.status(201).json(client);
};

exports.getAll = (req, res, next) => {
    var companies = clientService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    clientService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};