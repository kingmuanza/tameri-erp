var LocalStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
    LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./localbd');
}

const Warehouseblock = require('../_models/warehouseblock.model.js');

exports.create = (item) => {
    return new Promise((resolve, reject) => {

        const warehouseblock = new Warehouseblock(item);
        warehouseblock.save().then((err, data) => {
            resolve(warehouseblock._id)
        }).catch(() => {

        });
    });
}

exports.modify = (item) => {
    return new Promise((resolve, reject) => {
        Warehouseblock.updateOne({
            _id: item._id
        }, {
            $set: item
        }).then(() => {
            resolve(item);
        }).catch(() => {

        });
    });
}

exports.get = (id) => {
    return new Promise((resolve, reject) => {
        Warehouseblock.findOne({
            _id: id
        }).then((item) => {
            resolve(item);
        }).catch(() => {
            //reject(error)
        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Warehouseblock.find().then((items) => {
            resolve(items);
        }).catch((error) => {
            reject(error)
        });
    });
}

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        Warehouseblock.deleteOne({
            _id: id
        }).then(() => {
            resolve(id);
        }).catch(() => {

        });
    });
}