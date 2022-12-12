const mongoose = require('mongoose');

const CommunitySchema = mongoose.Schema({
    id: String,
    name: String,
    description: String,
    type: Object,
});

module.exports = mongoose.model('Community', CommunitySchema);