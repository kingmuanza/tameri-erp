const mongoose = require('mongoose');

const OrderlineSchema = mongoose.Schema({
    id: String,
    productpack: Object,
    quantity: Number,
    saved: Boolean,
    idsale: String,
});

module.exports = mongoose.model('Orderline', OrderlineSchema);