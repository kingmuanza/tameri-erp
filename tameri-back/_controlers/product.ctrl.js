const productService = require('../_services/product.service');

exports.create = (req, res, next) => {
    productService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    productService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    productService.get(req.params.id).then((product) => {
        console.log('product');
        console.log(product);
        res.status(201).json(product);
    });
};

exports.getAll = (req, res, next) => {
    productService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    productService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};