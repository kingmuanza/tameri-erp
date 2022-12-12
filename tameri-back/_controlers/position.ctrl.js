const positionService = require('../_services/position.service');

exports.create = (req, res, next) => {
    positionService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    positionService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    positionService.get(req.params.id).then((position) => {
        console.log('position');
        console.log(position);
        res.status(201).json(position);
    });
};

exports.getAll = (req, res, next) => {
    positionService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    positionService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};