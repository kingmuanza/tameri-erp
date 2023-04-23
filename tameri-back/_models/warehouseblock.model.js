const mongoose = require('mongoose');

const WarehouseblockSchema = mongoose.Schema({
    id: String,
    date: Date,
    warehouse: Object,
    name: String,
    position: String,
    surface: Number,
    description: String
});

module.exports = mongoose.model('Warehouseblock', WarehouseblockSchema);