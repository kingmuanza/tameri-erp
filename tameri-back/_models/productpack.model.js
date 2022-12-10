const mongoose = require('mongoose');

const ProductpackSchema = mongoose.Schema({
    id: String,
    name: String,
    quantity: Number,
    price: Number,
    company: Object,
    product: Object,
});

module.exports = mongoose.model('Productpack', ProductpackSchema);