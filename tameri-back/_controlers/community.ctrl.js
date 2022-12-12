const communityService = require('../_services/community.service');

exports.create = (req, res, next) => {
    communityService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    communityService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    communityService.get(req.params.id).then((community) => {
        console.log('community');
        console.log(community);
        res.status(201).json(community);
    });
};

exports.getAll = (req, res, next) => {
    communityService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    communityService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};