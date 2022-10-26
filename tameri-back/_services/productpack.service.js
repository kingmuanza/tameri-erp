var LocalStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
    LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./localbd');
}


exports.create = (item) => {
    var items = [];
    var itemsString = localStorage.getItem('productpack');
    if (itemsString) {
        items = JSON.parse(itemsString);
    }
    items.push(item);
    localStorage.setItem('productpack', JSON.stringify(items));
}

exports.modify = (item) => {
    var items = [];
    var nouveauxitems = [];
    var itemsString = localStorage.getItem('productpack');
    if (itemsString) {
        items = JSON.parse(itemsString);
    }
    items.forEach((element) => {
        if (element.id === item.id) {
            nouveauxitems.push(item);
        } else {
            nouveauxitems.push(element);
        }
    });
    localStorage.setItem('productpack', JSON.stringify(nouveauxitems));
}

exports.get = (id) => {
    var items = [];
    var itemsString = localStorage.getItem('productpack');
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
    var itemsString = localStorage.getItem('productpack');
    if (itemsString) {
        items = JSON.parse(itemsString);
    }
    return items;
}

exports.delete = (id) => {
    var items = [];
    var nouveauxitems = [];
    var itemsString = localStorage.getItem('productpack');
    if (itemsString) {
        items = JSON.parse(itemsString);
    }
    items.forEach((element) => {
        if (element.id === id) {} else {
            nouveauxitems.push(element);
        }
    });
    localStorage.setItem('productpack', JSON.stringify(nouveauxitems));
}