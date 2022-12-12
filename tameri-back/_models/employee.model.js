const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    id: String,
    names: String,
    tel: String,
    email: String,
    position: Object,
    role: Object,
    acl: String,
    login: String,
    password: String,
    company: Object,
    userID: Object,
});

module.exports = mongoose.model('Employee', EmployeeSchema);