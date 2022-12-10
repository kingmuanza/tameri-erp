const producttypeService = require('../_services/producttype.service');

exports.create = (req, res, next) => {
    producttypeService.create(req.body).then(() => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    producttypeService.modify(req.body).then((data) => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    producttypeService.get(req.params.id).then((producttype) => {
        console.log('producttype');
        console.log(producttype);
        res.status(201).json(producttype);
    });
};

exports.getAll = (req, res, next) => {
    producttypeService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    producttypeService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};