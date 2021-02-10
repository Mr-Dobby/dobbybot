const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Profile = require("../../lib/profile");
const owners = require("../../storage/config.json")

module.exports.run = async (bot, message, args, client) => {

  let owner = message.author;
    if (owner.id !== owners.owner) return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete({ timeout: 5000 }));
        
        let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
        let userProfile = await Profile.findOne( { user: message.author.id } ) 

}

module.exports.help = {
  name: "tkn",
  aliases: []
}
