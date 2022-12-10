const productpackService = require('../_services/productpack.service');

exports.create = (req, res, next) => {
    productpackService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    productpackService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    productpackService.get(req.params.id).then((productpack) => {
        console.log('productpack');
        console.log(productpack);
        res.status(201).json(productpack);
    });
};

exports.getAll = (req, res, next) => {
    productpackService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    productpackService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};