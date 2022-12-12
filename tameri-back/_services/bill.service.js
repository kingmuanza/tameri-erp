const salelineService = require('../_services/saleline.service');

exports.saveLines = (bill) => {
    return new Promise(async(resolve, reject) => {
        for (var i = 0; i < bill.salelines.length; i++) {
            var saleline = bill.salelines[i];
            if (!saleline.saved) {
                saleline.saved = true;
                saleline['idsale'] = bill.id;
                var _id = await salelineService.create(saleline);
                saleline._id = _id;
            }
        }
        resolve(bill.salelines);
    });
}

exports.deleteLines = (id) => {
    return new Promise((resolve, reject) => {
        this.get(id).then(async(bill) => {

            console.log('I GOT THIS BILL');
            console.log(bill._id);
            for (var i = 0; i < bill.salelines.length; i++) {
                var saleline = bill.salelines[i];
                console.log('deleting...');
                console.log(saleline);
                await salelineService.delete(saleline._id);
                console.log('delete saleline : ' + saleline._id);
            }
            resolve(true);
        });
    });
}

const Bill = require('../_models/bill.model.js');

exports.create = (item) => {
    return new Promise((resolve, reject) => {
        this.saveLines(item).then((salelines) => {
            item.salelines = salelines;
            const bill = new Bill(item);
            bill.save().then((err, data) => {
                resolve(bill._id)
            }).catch(() => {

            });
        }).catch(() => {

        });
    });
}

exports.modify = (item) => {
    return new Promise((resolve, reject) => {
        this.saveLines(item).then((salelines) => {
            item.salelines = salelines;
            Bill.updateOne({
                _id: item._id
            }, {
                $set: item
            }).then(() => {
                resolve(item);
            }).catch(() => {

            });
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
    console.log('I WANT TO DELETE THIS BILL');
    console.log(id);
    return new Promise((resolve, reject) => {
        this.deleteLines(id).then(() => {

            console.log('I HAVE DELETE ALL SALE LINES');
            Bill.deleteOne({
                _id: id
            }).then(() => {
                resolve(id);
            }).catch(() => {

            });
        });
    });
}