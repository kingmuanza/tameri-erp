const mongoose = require('mongoose');

const ClientgroupSchema = mongoose.Schema({
    id: String,
    name: String,
    reductionglobale: Number,
    contact: Object,
    company: Object,
});

module.exports = mongoose.model('Clientgroup', ClientgroupSchema);