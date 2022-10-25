const authService = require('../_services/auth.service');

exports.create = (req, res, next) => {
    authService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.connexion = (req, res, next) => {
    const user = authService.connexion(req.body.login, req.body.password);
    res.status(201).json(user);
};

exports.modify = (req, res, next) => {
    authService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    var auth = authService.get(req.params.id);
    res.status(201).json(auth);
};

exports.getAll = (req, res, next) => {
    var companies = authService.getAll();
    res.status(201).json(companies);
};

exports.getAllByLogin = (req, res, next) => {
    var companies = authService.getAllByLogin(req.params.login);
    res.status(201).json(companies);
};

exports.delete = (req, res, next) => {
    authService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};