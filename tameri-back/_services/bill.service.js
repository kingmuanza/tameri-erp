const authService = require('../_services/auth.service');
const salelineService = require('../_services/saleline.service');

var LocalStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
    LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./localbd');
}

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

exports.create = (item) => {
    var items = [];
    var itemsString = localStorage.getItem('bill');
    if (itemsString) {
        items = JSON.parse(itemsString);
    }
    item.salelines = this.saveLines(item);
    items.push(item);
    localStorage.setItem('bill', JSON.stringify(items));
}

exports.modify = (item) => {
    var items = [];
    var nouveauxitems = [];
    var itemsString = localStorage.getItem('bill');
    if (itemsString) {
        items = JSON.parse(itemsString);
    }
    item.salelines = this.saveLines(item);
    items.forEach((element) => {
        if (element.id === item.id) {
            nouveauxitems.push(item);
        } else {
            nouveauxitems.push(element);
        }
    });
    localStorage.setItem('bill', JSON.stringify(nouveauxitems));
}

exports.get = (id) => {
    var items = [];
    var itemsString = localStorage.getItem('bill');
    if (itemsString) {
        items = JSON.parse(itemsString);
    }
    var item;
    items.forEach((element) => {
        if (element.id === id) {
            item = element;
        }
    });
    return item;
}

exports.getAll = () => {
    var items = [];
    var itemsString = localStorage.getItem('bill');
    if (itemsString) {
        items = JSON.parse(itemsString);
    }
    return items;
}

exports.delete = (id) => {
    var items = [];
    var nouveauxitems = [];
    var itemsString = localStorage.getItem('bill');
    if (itemsString) {
        items = JSON.parse(itemsString);
    }
    items.forEach((element) => {
        if (element.id === id) {} else {
            nouveauxitems.push(element);
        }
    });
    localStorage.setItem('bill', JSON.stringify(nouveauxitems));
    setTimeout(() => {
        authService.delete(id);
    }, 500);
}