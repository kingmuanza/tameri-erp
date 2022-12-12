const authService = require('../_services/auth.service');

exports.create = (req, res, next) => {
    authService.create(req.body).then(() => {
        res.status(201).json({
            message: 'create !',
            body: req.body
        });
    });
};

exports.connexion = (req, res, next) => {
    authService.connexion(req.body.login, req.body.password).then((user) => {
        res.status(201).json(user);
    });
};

exports.modify = (req, res, next) => {
    authService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });
    });
};

exports.get = (req, res, next) => {
    authService.get(req.params.id).then((auth) => {
        res.status(201).json(auth);
    });
};

exports.getAll = (req, res, next) => {
    authService.getAll().then((users) => {
        res.status(201).json(users);
    });
};

exports.getAllByLogin = (req, res, next) => {
    authService.getAllByLogin(req.params.login).then((users) => {
        res.status(201).json(users);
    });
};

exports.delete = (req, res, next) => {
    authService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};