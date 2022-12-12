const communitytypeService = require('../_services/communitytype.service');

exports.create = (req, res, next) => {
    communitytypeService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    communitytypeService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    communitytypeService.get(req.params.id).then((communitytype) => {
        console.log('communitytype');
        console.log(communitytype);
        res.status(201).json(communitytype);
    });
};

exports.getAll = (req, res, next) => {
    communitytypeService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    communitytypeService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};