const resourcetypeService = require('../_services/resourcetype.service');

exports.create = (req, res, next) => {
    resourcetypeService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    resourcetypeService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    resourcetypeService.get(req.params.id).then((resourcetype) => {
        console.log('resourcetype');
        console.log(resourcetype);
        res.status(201).json(resourcetype);
    });
};

exports.getAll = (req, res, next) => {
    resourcetypeService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    resourcetypeService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};