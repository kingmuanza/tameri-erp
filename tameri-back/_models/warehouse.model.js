const mongoose = require('mongoose');

const WarehouseSchema = mongoose.Schema({
    id: String,
    date: Date,
    company: Object,
    name: String,
    location: String,
    surface: Number,
    description: String,
    blocks: Object,
});

module.exports = mongoose.model('Warehouse', WarehouseSchema);