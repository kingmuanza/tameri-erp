const productitemService = require('../_services/productitem.service');

exports.create = (req, res, next) => {
    productitemService.create(req.body).then((data) => {
        console.log('data a la sorite de la création');
        console.log(data);
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    productitemService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    productitemService.get(req.params.id).then((productitem) => {
        console.log('productitem');
        console.log(productitem);
        res.status(201).json(productitem);
    });
};

exports.getAll = (req, res, next) => {
    productitemService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    productitemService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};