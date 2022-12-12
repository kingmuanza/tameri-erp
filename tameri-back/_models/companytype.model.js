const mongoose = require('mongoose');

const CompanytypeSchema = mongoose.Schema({
    id: String,
    name: String,
    description: String,
});

module.exports = mongoose.model('Companytype', CompanytypeSchema);