const mongoose = require('mongoose');

const ResourceusedSchema = mongoose.Schema({
    id: String,
    date: Date,
    resource: Object,
    company: Object,
    resourceusedgroup: Object,
    quantity: Number,
    whole: Number,
    opened: Number,
});

module.exports = mongoose.model('Resourceused', ResourceusedSchema);