const mongoose = require('mongoose');

const PricingSchema = mongoose.Schema({
    id: String,
    name: String,
    productResource: Number,
    productPack: Number,

    restau: Number,
    bar: Number,
    shop: Number,
    prestationservice: Number,
    personnalized: Number,

    service: Number,
    client: Number,
    pack: Number,
    printing: Number,
    scm: Number,
    crm: Number,
});

module.exports = mongoose.model('Pricing', PricingSchema);