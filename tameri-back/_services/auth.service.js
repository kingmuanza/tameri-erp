var LocalStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
    LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./localbd');
}


exports.create = (item) => {
    var items = [];
    var itemsString = localStorage.getItem('user');
    if (itemsString) {
        items = JSON.parse(itemsString);
    }
    items.push(item);
    localStorage.setItem('user', JSON.stringify(items));
}

exports.modify = (item) => {
    var items = [];
    var nouveauxitems = [];
    var itemsString = localStorage.getItem('user');
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
    localStorage.setItem('user', JSON.stringify(nouveauxitems));
}

exports.get = (id) => {
    var items = [];
    var itemsString = localStorage.getItem('user');
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
    var itemsString = localStorage.getItem('user');
    if (itemsString) {
        items = JSON.parse(itemsString);
    }
    return items;
}

exports.getAllByLogin = (login) => {
    var items = [];
    var nouveauxitems = [];
    var itemsString = localStorage.getItem('user');
    if (itemsString) {
        items = JSON.parse(itemsString);
        items.forEach((element) => {
            if (element.login === login) {
                nouveauxitems.push(element);
            }
        });
    }
    return nouveauxitems;
}

exports.connexion = (login, passe) => {
    var items = [];
    var nouveauxitems = [];
    var itemsString = localStorage.getItem('user');
    if (itemsString) {
        items = JSON.parse(itemsString);
        items.forEach((element) => {
            if (element.login === login && element.password === passe) {
                nouveauxitems.push(element);
            }
        });
    }
    if (nouveauxitems.length > 0) {
        return nouveauxitems[0];
    } else {
        return null;
    }
}

exports.delete = (id) => {
    var items = [];
    var nouveauxitems = [];
    var itemsString = localStorage.getItem('user');
    if (itemsString) {
        items = JSON.parse(itemsString);
    }
    items.forEach((element) => {
        if (element.id === id) {} else {
            nouveauxitems.push(element);
        }
    });
    localStorage.setItem('user', JSON.stringify(nouveauxitems));
}