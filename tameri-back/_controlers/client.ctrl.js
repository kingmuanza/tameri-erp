const clientService = require('../_services/client.service');

exports.create = (req, res, next) => {
    clientService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    clientService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    clientService.get(req.params.id).then((client) => {
        console.log('client');
        console.log(client);
        res.status(201).json(client);
    });
};

exports.getAll = (req, res, next) => {
    clientService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    clientService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};