var LocalStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
    LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./localbd');
}

const Resourceusedgroup = require('../_models/resourceusedgroup.model.js');

exports.create = (item) => {
    console.log('CREATE NEW CLIENT');
    console.log(item);
    return new Promise((resolve, reject) => {
        const resourceusedgroup = new Resourceusedgroup(item);
        resourceusedgroup.save().then((err, data) => {
            resolve(resourceusedgroup._id)
        }).catch(() => {

        });
    });
}

exports.modify = (item) => {
    return new Promise((resolve, reject) => {
        Resourceusedgroup.updateOne({
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
        Resourceusedgroup.findOne({
            _id: id
        }).then((item) => {
            resolve(item);
        }).catch(() => {

        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Resourceusedgroup.find().then((items) => {
            resolve(items);
        }).catch((error) => {
            reject(error)
        });
    });
}

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        Resourceusedgroup.deleteOne({
            _id: id
        }).then(() => {
            resolve(id);
        }).catch(() => {

        });
    });
}