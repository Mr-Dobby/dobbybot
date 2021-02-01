const Discord = require("discord.js");
const commando = require('discord.js-commando');
const owners = require("../../storage/config.json").owner;

module.exports.run = async (bot, message, args, client) => {

  let owner = message.author;
    if (owner.id == owners) return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete({ timeout: 5000 }));

        serverID = args.join(' ');
        bot.guilds.cache.get(serverID).leave();
        message.channel.send(`Left server **${bot.guilds.cache.get(serverID).name}**`)

}

module.exports.help = {
  name: "guildleave",
  aliases: ["leave"]
}
