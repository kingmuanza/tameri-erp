const mongoose = require('mongoose');

const InventorySchema = mongoose.Schema({
    id: String,
    date: Date,
    resource: Object,
    company: Object,
    inventorygroup: Object,
    quantity: Number,
});

module.exports = mongoose.model('Inventory', InventorySchema);