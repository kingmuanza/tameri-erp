const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    id: String,
    date: Date,
    code: String,
    orderlines: Object,
    company: Object,
    good: Boolean,
    delivery: Boolean,
    client: Object,
    reduction: Number,
    deliveryDate: Date,
});

module.exports = mongoose.model('Order', OrderSchema);