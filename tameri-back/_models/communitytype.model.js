const mongoose = require('mongoose');

const CommunitytypeSchema = mongoose.Schema({
    id: String,
    name: String,
    description: String,
});

module.exports = mongoose.model('Communitytype', CommunitytypeSchema);