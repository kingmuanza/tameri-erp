exports.create = (req, res, next) => {
    res.status(201).json({
        message: 'create !',
        body: req.body
    });
};

exports.modify = (req, res, next) => {
    res.status(201).json({
        message: 'modify !',
        body: req.body
    });
};

exports.get = (req, res, next) => {
    res.status(201).json({
        message: 'get !',
        body: req.body
    });
};

exports.getAll = (req, res, next) => {
    res.status(201).json({
        message: 'get all !',
        body: req.body
    });
};

exports.delete = (req, res, next) => {
    // console.log('req.params.id');
    // console.log(req.params.id);
    var lesenvoi = envoiService.delete(req.params.id);
    res.status(201).json({
        message: 'delete !'
    });
};