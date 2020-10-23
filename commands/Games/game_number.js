const Discord = require("discord.js");
const Profile = require('../../lib/profile');
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args) => {

    var gameStarted = false;
    
    let userProfile = await Profile.findOne( { user: message.author.id } );
    let currPrefix = await Servers.findOne( { guildID: message.guild.id } );



}

module.exports.help = {
  name: "number",
  aliases: ["gn"]
}
