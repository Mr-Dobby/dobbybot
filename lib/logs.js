const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({

    guildID: String,
    incidentLog: String,
    serverLog: String,
    raidLog: String,
    welcomeLog: String

});

module.exports = mongoose.model('Logs', logSchema);