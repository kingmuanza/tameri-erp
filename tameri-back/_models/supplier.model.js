const mongoose = require('mongoose');

const SupplierSchema = mongoose.Schema({
    id: String,
    name: String,
    firstname: String,
    contact: Object,
    company: Object,
});

module.exports = mongoose.model('Supplier', SupplierSchema);