var LocalStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
    LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./localbd');
}

const User = require('../_models/user.model.js');

exports.create = (item) => {
    console.log('CREATE NEW USER');
    console.log(item);
    return new Promise((resolve, reject) => {
        const user = new User(item);
        user.save().then((err, data) => {
            resolve(user._id)
        }).catch((e) => {
            console.log(e);
            reject(e)
        });
    });
}

exports.modify = (item) => {
    return new Promise((resolve, reject) => {
        User.updateOne({
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
        User.findOne({
            _id: id
        }).then((item) => {
            resolve(item);
        }).catch(() => {

        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        User.find().then((items) => {
            resolve(items);
        }).catch((error) => {
            reject(error)
        });
    });
}

exports.getAllByLogin = (l) => {
    return new Promise((resolve, reject) => {
        User.find({
            login: l
        }).then((items) => {
            resolve(items);
        }).catch((error) => {
            reject(error)
        });
    });
}

exports.connexion = (l, passe) => {
    console.log('Connexion');
    console.log('Login : ' + l);
    console.log('Passe : ' + passe);
    return new Promise((resolve, reject) => {
        User.findOne({
            login: l,
            password: passe
        }).then((items) => {
            console.log('items');
            console.log(items);
            resolve(items);
        }).catch((error) => {
            reject(error)
        });
    });
}

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        User.deleteOne({
            _id: id
        }).then(() => {
            resolve(id);
        }).catch(() => {

        });
    });
}