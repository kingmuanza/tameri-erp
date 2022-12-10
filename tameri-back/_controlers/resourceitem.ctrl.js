const resourceitemService = require('../_services/resourceitem.service');

exports.create = (req, res, next) => {
    resourceitemService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    resourceitemService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    resourceitemService.get(req.params.id).then((resourceitem) => {
        console.log('resourceitem');
        console.log(resourceitem);
        res.status(201).json(resourceitem);
    });
};

exports.getAll = (req, res, next) => {
    resourceitemService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    resourceitemService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};