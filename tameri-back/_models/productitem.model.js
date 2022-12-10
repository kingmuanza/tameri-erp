const mongoose = require('mongoose');

const ProductitemSchema = mongoose.Schema({
    id: String,
    date: Date,
    quantity: Number,
    price: Number,
    company: Object,
    product: Object,
    productpack: Object,
    supplier: Object,
});

module.exports = mongoose.model('Productitem', ProductitemSchema);