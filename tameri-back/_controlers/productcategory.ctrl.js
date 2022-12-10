const productcategoryService = require('../_services/productcategory.service');

exports.create = (req, res, next) => {
    productcategoryService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    productcategoryService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    productcategoryService.get(req.params.id).then((productcategory) => {
        console.log('productcategory');
        console.log(productcategory);
        res.status(201).json(productcategory);
    });
};

exports.getAll = (req, res, next) => {
    productcategoryService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    productcategoryService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};