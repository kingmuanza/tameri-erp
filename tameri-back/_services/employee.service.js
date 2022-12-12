var LocalStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
    LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./localbd');
}

const Employee = require('../_models/employee.model.js');

exports.create = (item) => {
    console.log('CREATE NEW CLIENT');
    console.log(item);
    return new Promise((resolve, reject) => {
        const employee = new Employee(item);
        employee.save().then((err, data) => {
            resolve(employee._id)
        }).catch(() => {

        });
    });
}

exports.modify = (item) => {
    return new Promise((resolve, reject) => {
        Employee.updateOne({
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
        Employee.findOne({
            _id: id
        }).then((item) => {
            resolve(item);
        }).catch(() => {

        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Employee.find().then((items) => {
            resolve(items);
        }).catch((error) => {
            reject(error)
        });
    });
}

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        Employee.deleteOne({
            _id: id
        }).then(() => {
            resolve(id);
        }).catch(() => {

        });
    });
}