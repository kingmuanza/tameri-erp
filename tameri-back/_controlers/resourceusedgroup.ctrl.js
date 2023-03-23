const resourceusedgroupService = require('../_services/resourceusedgroup.service');

exports.create = (req, res, next) => {
    resourceusedgroupService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    resourceusedgroupService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    resourceusedgroupService.get(req.params.id).then((resourceusedgroup) => {
        console.log('resourceusedgroup');
        console.log(resourceusedgroup);
        res.status(201).json(resourceusedgroup);
    });
};

exports.getAll = (req, res, next) => {
    resourceusedgroupService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    resourceusedgroupService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};