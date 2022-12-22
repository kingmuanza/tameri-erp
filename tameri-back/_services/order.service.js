const salelineService = require('../_services/saleline.service');

exports.saveLines = (order) => {
    return new Promise(async(resolve, reject) => {
        for (var i = 0; i < order.orderlines.length; i++) {
            var saleline = order.orderlines[i];
            if (!saleline.saved) {
                saleline.saved = true;
                saleline['idsale'] = order.id;
                var _id = await salelineService.create(saleline);
                saleline._id = _id;
            }
        }
        resolve(order.orderlines);
    });
}

exports.deleteLines = (id) => {
    return new Promise((resolve, reject) => {
        this.get(id).then(async(order) => {

            console.log('I GOT THIS BILL');
            console.log(order._id);
            for (var i = 0; i < order.orderlines.length; i++) {
                var saleline = order.orderlines[i];
                console.log('deleting...');
                console.log(saleline);
                await salelineService.delete(saleline._id);
                console.log('delete saleline : ' + saleline._id);
            }
            resolve(true);
        });
    });
}

const Order = require('../_models/order.model.js');

exports.create = (item) => {
    return new Promise((resolve, reject) => {
        this.saveLines(item).then((orderlines) => {
            item.orderlines = orderlines;
            const order = new Order(item);
            order.save().then((err, data) => {
                resolve(order._id)
            }).catch(() => {

            });
        }).catch(() => {

        });
    });
}

exports.modify = (item) => {
    return new Promise((resolve, reject) => {
        this.saveLines(item).then((orderlines) => {
            item.orderlines = orderlines;
            Order.updateOne({
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
        Order.findOne({
            _id: id
        }).then((item) => {
            resolve(item);
        }).catch(() => {

        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Order.find().then((items) => {
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
            Order.deleteOne({
                _id: id
            }).then(() => {
                resolve(id);
            }).catch(() => {

            });
        });
    });
}