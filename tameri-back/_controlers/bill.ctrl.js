const billService = require('../_services/bill.service');

exports.create = (req, res, next) => {
    billService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    billService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    billService.get(req.params.id).then((bill) => {
        console.log('bill');
        console.log(bill);
        res.status(201).json(bill);
    });
};

exports.getAll = (req, res, next) => {
    billService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    billService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};