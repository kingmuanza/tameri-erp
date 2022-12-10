const mongoose = require('mongoose');

const ProductcategorySchema = mongoose.Schema({
    id: String,
    name: String,
    description: String,
    company: Object,
});

module.exports = mongoose.model('Productcategory', ProductcategorySchema);