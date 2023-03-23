const mongoose = require('mongoose');

const ResourceusedgroupSchema = mongoose.Schema({
    id: String,
    date: Date,
    company: Object,
});

module.exports = mongoose.model('Resourceusedgroup', ResourceusedgroupSchema);