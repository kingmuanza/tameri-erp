const companytypeService = require('../_services/companytype.service');

exports.create = (req, res, next) => {
    companytypeService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    companytypeService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    companytypeService.get(req.params.id).then((companytype) => {
        console.log('companytype');
        console.log(companytype);
        res.status(201).json(companytype);
    });
};

exports.getAll = (req, res, next) => {
    companytypeService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    companytypeService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};