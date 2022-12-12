const mongoose = require('mongoose');

const PositionSchema = mongoose.Schema({
    id: String,
    name: String,
    description: String,
});

module.exports = mongoose.model('Position', PositionSchema);