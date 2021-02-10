const Discord = require("discord.js");
const commando = require('discord.js-commando');
const owners = require("../../storage/config.json")

module.exports.run = async (bot, message, args, client) => {

  let owner = message.author;
    if (owner.id !== owners.owner) return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete({ timeout: 5000 }));

        const guildNames = bot.guilds.cache.sort((a, b) => b.position - a.position).map(g => g.name).map((r, i) => `\`${i + 1}\` | ${r}`).join("\n")
        const guildIDs = bot.guilds.cache.sort((a, b) => b.position - a.position).map(i => i.id).map((r, i) => `\`${i + 1}\` | ${r}`).join("\n");

        embed = new Discord.MessageEmbed()
            .setAuthor("Server Names | Their ID", bot.user.displayAvatarURL({ dynamic: true }))
            .addField("Names", guildNames, true)
            .addField("IDs", guildIDs, true)

    message.channel.send(embed)
}

module.exports.help = {
  name: "guildlist",
  aliases: []
}
