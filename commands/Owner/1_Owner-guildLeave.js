const Discord = require("discord.js");
const commando = require('discord.js-commando');

module.exports.run = async (bot, message, args, client) => {

    let owner = message.author;
    if (owner.id !== "441478072559075328" && owner.id !== "329354230861398016") return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete(5000))

        serverID = args.join(' ');
        bot.guilds.get(serverID).leave();
        message.channel.send(`Left server **${bot.guilds.get(serverID).name}**`)

}

module.exports.help = {
  name: "guildleave",
  aliases: ["leave"]
}