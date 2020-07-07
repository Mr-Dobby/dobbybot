const mongoose = require('mongoose');

const warnSchema = new mongoose.Schema({

    guildID: String,
    warnedUsername: String,
    warnedID: String,
    reason: String,
    moderator: String,
    moderatorID: String,
    time: String

});

module.exports = mongoose.model('Warns', warnSchema);