const mongoose = require('mongoose');

const ResourceSchema = mongoose.Schema({
    id: String,
    name: String,
    category: Object,
    content: Number,
    type: String,
    unit: String,
    price: Number,
    warning: Number,
    now: Number,
    supplier: Object,
    company: Object,
});

module.exports = mongoose.model('Resource', ResourceSchema);