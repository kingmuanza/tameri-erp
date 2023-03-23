var LocalStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
    LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./localbd');
}

const Resourceused = require('../_models/resourceused.model.js');

exports.create = (item) => {
    console.log('CREATE NEW CLIENT');
    console.log(item);
    return new Promise((resolve, reject) => {
        const resourceused = new Resourceused(item);
        resourceused.save().then((err, data) => {
            resolve(resourceused._id)
        }).catch(() => {

        });
    });
}

exports.modify = (item) => {
    return new Promise((resolve, reject) => {
        Resourceused.updateOne({
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
        Resourceused.findOne({
            _id: id
        }).then((item) => {
            resolve(item);
        }).catch(() => {

        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Resourceused.find().then((items) => {
            resolve(items);
        }).catch((error) => {
            reject(error)
        });
    });
}

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        Resourceused.deleteOne({
            _id: id
        }).then(() => {
            resolve(id);
        }).catch(() => {

        });
    });
}