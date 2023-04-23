const warehouseService = require('../_services/warehouse.service');

exports.create = (req, res, next) => {
    warehouseService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    warehouseService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

/* exports.get = (req, res, next) => { DOES NOT WORK AT ALLL
    console.log("warehouse ID-->" +  req.params.id);
    var warehouse = warehouseService.get(req.params.id);
    
    res.status(201).json(warehouse);
}; */


exports.get = (req, res, next) => {
    warehouseService.get(req.params.id).then((warehouse) => {
        console.log('warehouse');
        console.log(warehouse);
        res.status(201).json(warehouse);
    });
};


exports.getAll = (req, res, next) => {
    warehouseService.getAll().then((companies) => {
        res.status(201).json(companies);
    });
};

exports.delete = (req, res, next) => {
    warehouseService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};