const resourceusedService = require('../_services/resourceused.service');

exports.create = (req, res, next) => {
    resourceusedService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    resourceusedService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    resourceusedService.get(req.params.id).then((resourceused) => {
        console.log('resourceused');
        console.log(resourceused);
        res.status(201).json(resourceused);
    });
};

exports.getAll = (req, res, next) => {
    resourceusedService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    resourceusedService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};