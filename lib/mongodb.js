const mongoose = require('mongoose');

const config = new mongoose.Schema({

    guildID: String,
    prefix: String,
    muteRole: String,
    chatbanRole: String,
    lvlmsg: Boolean,
    lockdown: Boolean

});

module.exports = mongoose.model('Servers', config);