const warehouseblockService = require('../_services/warehouseblock.service');

exports.create = (req, res, next) => {
    warehouseblockService.create(req.body);
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    warehouseblockService.modify(req.body);
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

/* exports.get = (req, res, next) => { DOES NOT WORK AT ALLL
    console.log("warehouseblock ID-->" +  req.params.id);
    var warehouseblock = warehouseblockService.get(req.params.id);
    
    res.status(201).json(warehouseblock);
}; */


exports.get = (req, res, next) => {
    warehouseblockService.get(req.params.id).then((warehouseblock) => {
        console.log('warehouseblock');
        console.log(warehouseblock);
        res.status(201).json(warehouseblock);
    });
};


exports.getAll = (req, res, next) => {
    warehouseblockService.getAll().then((warehouseblocks) => {
        res.status(201).json(warehouseblocks);
    });
};

exports.delete = (req, res, next) => {
    warehouseblockService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};