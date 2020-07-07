const Discord = require("discord.js");
const {bot} = require('../index');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
        if (err) return console.error(err);
});
const Config = require('../lib/mongodb');
const Raid = require('../lib/raid');
const Logs = require('../lib/logs');
const Ticket = require('../lib/ticketsys');

bot.on("guildDelete", async (guild) => {

    await Config.deleteMany( { guildID: guild.id } )
    await Raid.deleteMany( { guildID: guild.id } )
    await Logs.deleteMany( { guildID: guild.id } )
    await Ticket.deleteMany( { guildID: guild.id } )

});