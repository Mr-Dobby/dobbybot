const mongoose = require('mongoose');

const raidSchema = new mongoose.Schema({

    guildID: String,
    raid: Boolean

});

module.exports = mongoose.model('Raids', raidSchema);