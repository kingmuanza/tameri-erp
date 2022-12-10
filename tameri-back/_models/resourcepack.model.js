const mongoose = require('mongoose');

const ResourcepackSchema = mongoose.Schema({
    id: String,
    name: String,
    quantity: Number,
    price: Number,
    company: Object,
    resource: Object,
});

module.exports = mongoose.model('Resourcepack', ResourcepackSchema);