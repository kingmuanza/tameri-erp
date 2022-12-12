const mongoose = require('mongoose');

const BillSchema = mongoose.Schema({
    id: String,
    date: Date,
    code: String,
    salelines: Object,
    company: Object,
    good: Boolean,
    delivery: Boolean,
    client: Object,
});

module.exports = mongoose.model('Bill', BillSchema);