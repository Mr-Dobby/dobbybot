const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({

    guildID: String,
    channelID: String,
    authorID: String,
    bugReportCode: String,
    bugMessage: String,
    reportedAt: String

});

module.exports = mongoose.model('Bug', bugSchema);