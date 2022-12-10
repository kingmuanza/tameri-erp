const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    id: String,
    name: String,
    category: Object,
    content: Number,
    type: String,
    unit: String,
    price: Number,
    warning: Number,
    now: Number,
    resources: Object,
    company: Object,
});

module.exports = mongoose.model('Product', ProductSchema);