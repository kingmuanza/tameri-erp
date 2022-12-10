const mongoose = require('mongoose');

const ResourceitemSchema = mongoose.Schema({

    id: String,
    date: Date,
    quantity: Number,
    price: Number,
    company: Object,
    resource: Object,
    resourcepack: Object,
    supplier: Object,
});

module.exports = mongoose.model('Resourceitem', ResourceitemSchema);