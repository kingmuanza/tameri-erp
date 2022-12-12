const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
    id: String,
    name: String,
    description: String,
    code: String,
    dial_code: String,
});

module.exports = mongoose.model('Country', CountrySchema);