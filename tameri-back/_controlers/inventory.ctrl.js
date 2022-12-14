const inventoryService = require('../_services/inventory.service');

exports.create = (req, res, next) => {
    inventoryService.create(req.body).then((data) => {
        res.status(201).json(data);
    });
};

exports.modify = (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    inventoryService.modify(req.body).then(() => {
        res.status(201).json({
            message: 'modify !',
            body: req.body
        });

    });
};

exports.get = (req, res, next) => {
    inventoryService.get(req.params.id).then((inventory) => {
        console.log('inventory');
        console.log(inventory);
        res.status(201).json(inventory);
    });
};

exports.getAll = (req, res, next) => {
    inventoryService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    inventoryService.delete(req.params.id).then(() => {
        res.status(201).json({
            message: 'delete !'
        });
    });
};