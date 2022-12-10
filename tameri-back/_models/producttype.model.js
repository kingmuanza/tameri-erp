const mongoose = require('mongoose');

const ProducttypeSchema = mongoose.Schema({
    id: String,
    name: String,
    description: String,
    company: Object,
});

module.exports = mongoose.model('Producttype', ProducttypeSchema);