var LocalStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
    LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./localbd');
}

const Warehouse = require('../_models/warehouse.model.js');

exports.create = (item) => {
    return new Promise((resolve, reject) => {

        const warehouse = new Warehouse(item);
        warehouse.save().then((err, data) => {
            resolve(warehouse._id)
        }).catch(() => {

        });
    });
}

exports.modify = (item) => {
    return new Promise((resolve, reject) => {
        Warehouse.updateOne({
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
        Warehouse.findOne({
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
        Warehouse.find().then((items) => {
            resolve(items);
        }).catch((error) => {
            reject(error)
        });
    });
}

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        Warehouse.deleteOne({
            _id: id
        }).then(() => {
            resolve(id);
        }).catch(() => {

        });
    });
}