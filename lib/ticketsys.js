const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({

    guildID: String,
    ticketID: Number,
    categoryID: String

});

module.exports = mongoose.model('Tickets', ticketSchema);