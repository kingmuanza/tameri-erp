const billService = require('../_services/bill.service');

exports.create = (req, res, next) => {
    billService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    billService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var bill = billService.get(req.params.id);
    res.status(201).json(bill);
};

exports.getAll = (req, res, next) => {
    var companies = billService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    billService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};