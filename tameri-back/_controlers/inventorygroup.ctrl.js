const inventorygroupService = require('../_services/inventorygroup.service');

exports.create = (req, res, next) => {
    inventorygroupService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    inventorygroupService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    inventorygroupService.get(req.params.id).then((inventorygroup) => {
        console.log('inventorygroup');
        console.log(inventorygroup);
        res.status(201).json(inventorygroup);
    });
};

exports.getAll = (req, res, next) => {
    inventorygroupService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    inventorygroupService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};