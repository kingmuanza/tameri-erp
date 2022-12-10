var LocalStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
    LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./localbd');
}

const Resourceitem = require('../_models/resourceitem.model.js');

exports.create = (item) => {
    return new Promise((resolve, reject) => {

        const resourceitem = new Resourceitem(item);
        resourceitem.save().then((err, data) => {
            resolve(resourceitem._id)
        }).catch(() => {

        });
    });
}

exports.modify = (item) => {
    return new Promise((resolve, reject) => {
        Resourceitem.updateOne({
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
        Resourceitem.findOne({
            _id: id
        }).then((item) => {
            resolve(item);
        }).catch(() => {

        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Resourceitem.find().then((items) => {
            resolve(items);
        }).catch((error) => {
            reject(error)
        });
    });
}

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        Resourceitem.deleteOne({
            id: id
        }).then(() => {
            resolve(id);
        }).catch(() => {

        });
    });
}