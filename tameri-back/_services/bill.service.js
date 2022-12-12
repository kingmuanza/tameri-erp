const salelineService = require('../_services/saleline.service');

exports.saveLines = (bill) => {
    bill.salelines.forEach((saleline) => {
        if (!saleline.saved) {
            saleline.saved = true;
            saleline['idsale'] = bill.id;
            salelineService.create(saleline);
        }
    });
    return bill.salelines;
}

const Bill = require('../_models/bill.model.js');

exports.create = (item) => {
    return new Promise((resolve, reject) => {

        const bill = new Bill(item);
        bill.save().then((err, data) => {
            resolve(bill._id)
        }).catch(() => {

        });
    });
}

exports.modify = (item) => {
    return new Promise((resolve, reject) => {
        Bill.updateOne({
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
        Bill.findOne({
            _id: id
        }).then((item) => {
            resolve(item);
        }).catch(() => {

        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Bill.find().then((items) => {
            resolve(items);
        }).catch((error) => {
            reject(error)
        });
    });
}

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        Bill.deleteOne({
            id: id
        }).then(() => {
            resolve(id);
        }).catch(() => {

        });
    });
}