const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    id: String,
    name: String,
    firstname: String,
    contact: Object,
    company: Object,
    group: Object,
});

module.exports = mongoose.model('Client', ClientSchema);