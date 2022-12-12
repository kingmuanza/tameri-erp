var LocalStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
    LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./localbd');
}

const Companytype = require('../_models/companytype.model.js');

exports.create = (item) => {
    console.log('CREATE NEW CLIENT');
    console.log(item);
    return new Promise((resolve, reject) => {
        const companytype = new Companytype(item);
        companytype.save().then((err, data) => {
            resolve(companytype._id)
        }).catch(() => {

        });
    });
}

exports.modify = (item) => {
    return new Promise((resolve, reject) => {
        Companytype.updateOne({
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
        Companytype.findOne({
            _id: id
        }).then((item) => {
            resolve(item);
        }).catch(() => {

        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Companytype.find().then((items) => {
            resolve(items);
        }).catch((error) => {
            reject(error)
        });
    });
}

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        Companytype.deleteOne({
            _id: id
        }).then(() => {
            resolve(id);
        }).catch(() => {

        });
    });
}