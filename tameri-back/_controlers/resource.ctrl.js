const resourceService = require('../_services/resource.service');

exports.create = (req, res, next) => {
    resourceService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    resourceService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    resourceService.get(req.params.id).then((resource) => {
        console.log('resource');
        console.log(resource);
        res.status(201).json(resource);
    });
};

exports.getAll = (req, res, next) => {
    resourceService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    resourceService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};