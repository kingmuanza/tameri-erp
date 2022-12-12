const salelineService = require('../_services/saleline.service');

exports.create = (req, res, next) => {
    salelineService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    salelineService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    salelineService.get(req.params.id).then((saleline) => {
        console.log('saleline');
        console.log(saleline);
        res.status(201).json(saleline);
    });
};

exports.getAll = (req, res, next) => {
    salelineService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    salelineService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};