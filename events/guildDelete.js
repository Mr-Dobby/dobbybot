const Discord = require("discord.js");
const {bot} = require('../index');
const Config = require('../lib/mongodb');
const Raid = require('../lib/raid');
const Logs = require('../lib/logs');
const Ticket = require('../lib/ticketsys');

module.exports = async (bot, guild) => {

    await Config.findOneAndDelete( { guildID: guild.id } );
    await Raid.findOneAndDelete( { guildID: guild.id } );
    await Logs.findOneAndDelete( { guildID: guild.id } );
    await Ticket.findOneAndDelete( { guildID: guild.id } );

};