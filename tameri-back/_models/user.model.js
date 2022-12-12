const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    id: String,
    name: String,
    acl: String,
    login: String,
    password: String,
    role: Object,
    company: Object,
    locked: Boolean

});

module.exports = mongoose.model('User', UserSchema);