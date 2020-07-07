const Discord = require("discord.js");
const commando = require('discord.js-commando');

module.exports.run = async (bot, message, args, client) => {

    let owner = message.author;
    if (owner.id !== "441478072559075328" && owner.id !== "329354230861398016") return message.channel.send("You found an **owner only command** somehow!\nGuess you're not my developer, so I won't allow you to use this command!")
        .then(message => message.delete(5000))

        const guildNames = bot.guilds.sort((a, b) => b.position - a.position).map(g => g.name).map((r, i) => `\`${i + 1}\` | ${r}`).join("\n")
        const guildIDs = bot.guilds.sort((a, b) => b.position - a.position).map(i => i.id).map((r, i) => `\`${i + 1}\` | ${r}`).join("\n");

        embed = new Discord.RichEmbed()
            .setAuthor("Server Names | Their ID", bot.user.displayAvatarURL)
            .addField("Names", guildNames, true)
            .addField("IDs", guildIDs, true)

    message.channel.send(embed)
}

module.exports.help = {
  name: "guildlist",
  aliases: []
}
