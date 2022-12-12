const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    id: String,
    name: String,
    type: String,
    contact: Object,
    geolocation: String,
    currency: String,
    owner: Object,
    community: Object,
    option: Object,
    pricing: Object,
});

module.exports = mongoose.model('Company', CompanySchema);