const clientgroupService = require('../_services/clientgroup.service');

exports.create = (req, res, next) => {
    clientgroupService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    clientgroupService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    clientgroupService.get(req.params.id).then((clientgroup) => {
        console.log('clientgroup');
        console.log(clientgroup);
        res.status(201).json(clientgroup);
    });
};

exports.getAll = (req, res, next) => {
    clientgroupService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    clientgroupService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};