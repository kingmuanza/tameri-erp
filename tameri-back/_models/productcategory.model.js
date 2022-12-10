const mongoose = require('mongoose');

const ProductcategorySchema = mongoose.Schema({
    id: String,
    date: Date,
    quantity: Number,
    price: Number,
    company: Object,
    product: Object,
    productcategory: Object,
    supplier: Object,
});

module.exports = mongoose.model('Productcategory', ProductcategorySchema);