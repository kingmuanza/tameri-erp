const resourcepackService = require('../_services/resourcepack.service');

exports.create = (req, res, next) => {
    resourcepackService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    resourcepackService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    resourcepackService.get(req.params.id).then((resourcepack) => {
        console.log('resourcepack');
        console.log(resourcepack);
        res.status(201).json(resourcepack);
    });
};

exports.getAll = (req, res, next) => {
    resourcepackService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    resourcepackService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};