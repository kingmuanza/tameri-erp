const communitytypeService = require('../_services/communitytype.service');

exports.create = (req, res, next) => {
    communitytypeService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    communitytypeService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var communitytype = communitytypeService.get(req.params.id);
    res.status(201).json(communitytype);
};

exports.getAll = (req, res, next) => {
    var companies = communitytypeService.getAll();
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    communitytypeService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};