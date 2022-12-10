var LocalStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
    LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./localbd');
}

const Productpack = require('../_models/productpack.model.js');

exports.create = (item) => {
    return new Promise((resolve, reject) => {

        const productpack = new Productpack(item);
        productpack.save().then((err, data) => {
            resolve(productpack._id)
        }).catch(() => {

        });
    });
}

exports.modify = (item) => {
    return new Promise((resolve, reject) => {
        Productpack.updateOne({
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
        Productpack.findOne({
            _id: id
        }).then((item) => {
            resolve(item);
        }).catch(() => {

        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Productpack.find().then((items) => {
            resolve(items);
        }).catch((error) => {
            reject(error)
        });
    });
}

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        Productpack.deleteOne({
            id: id
        }).then(() => {
            resolve(id);
        }).catch(() => {

        });
    });
}