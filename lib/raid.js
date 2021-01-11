const mongoose = require('mongoose');

const raidSchema = new mongoose.Schema({

    guildID: String,
    raid: Boolean,
    ignoredChannels: String

});

module.exports = mongoose.model('Raids', raidSchema);