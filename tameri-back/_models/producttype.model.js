const mongoose = require('mongoose');

const ProducttypeSchema = mongoose.Schema({
    id: String,
    date: Date,
    quantity: Number,
    price: Number,
    company: Object,
    product: Object,
    producttype: Object,
    supplier: Object,
});

module.exports = mongoose.model('Producttype', ProducttypeSchema);