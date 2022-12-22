const orderlineService = require('../_services/orderline.service');

exports.create = (req, res, next) => {
    orderlineService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    orderlineService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    orderlineService.get(req.params.id).then((orderline) => {
        console.log('orderline');
        console.log(orderline);
        res.status(201).json(orderline);
    });
};

exports.getAll = (req, res, next) => {
    orderlineService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    orderlineService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};