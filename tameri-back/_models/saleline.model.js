const mongoose = require('mongoose');

const SalelineSchema = mongoose.Schema({
    id: String,
    productpack: Object,
    quantity: Number,
    saved: Boolean,
    idsale: String,
});

module.exports = mongoose.model('Saleline', SalelineSchema);