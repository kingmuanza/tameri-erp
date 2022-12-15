const mongoose = require('mongoose');

const InventorygroupSchema = mongoose.Schema({
    id: String,
    date: Date,
    company: Object,
});

module.exports = mongoose.model('Inventorygroup', InventorygroupSchema);