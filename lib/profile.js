const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({

    user: String,
    userName: String,
    globalReputation: Number,
    balance: Number,
    globalLevel: Number,
    xp: Number,
    quote: String,
    thumbnail: String,
    inventory: String,
    colour: String

});

module.exports = mongoose.model('Profile', profileSchema);