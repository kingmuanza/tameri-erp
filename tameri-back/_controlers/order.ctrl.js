const orderService = require('../_services/order.service');

exports.create = (req, res, next) => {
    orderService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    orderService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });
    });
};

exports.get = (req, res, next) => {
    orderService.get(req.params.id).then((order) => {
        res.status(201).json(order);
    });
};

exports.getAll = (req, res, next) => {
    orderService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    orderService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};