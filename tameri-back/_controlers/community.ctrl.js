const communityService = require('../_services/community.service');

exports.create = (req, res, next) => {
    communityService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    communityService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var community = communityService.get(req.params.id);
    res.status(201).json(community);
};

exports.getAll = (req, res, next) => {
    var companies = communityService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    communityService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};