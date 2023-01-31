const mongoose = require('mongoose');

const ResourceitemSchema = mongoose.Schema({

    id: String,
    date: Date,
    quantity: Number,
    quantityNotValidated: Number,
    quantityValidated: Number,
    price: Number,
    company: Object,
    resource: Object,
    resourcepack: Object,
    supplier: Object,
    status: Number,
});

module.exports = mongoose.model('Resourceitem', ResourceitemSchema);