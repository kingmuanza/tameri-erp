const mongoose = require('mongoose');

const ResourcetypeSchema = mongoose.Schema({
    id: String,
    name: String,
    description: String,
    company: Object,
});

module.exports = mongoose.model('Resourcetype', ResourcetypeSchema);