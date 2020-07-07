const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

            const nsfwEmbed = new Discord.RichEmbed()
            .setTitle("Enable NSFW")
            .setDescription("**NSFW!!** | Aliases: `nsfw`, `nsfwhuh`, `ennsfw`")
            .setFooter(`You need Manage Channels permission!`)
            .setTimestamp()
            .setImage('https://imgur.com/HmQ3ynK.png')

            message.channel.send({embed: nsfwEmbed})

}

module.exports.help = {
  name: "nsfwhuh",
  aliases: ["nsfw", "ennsfw"]
}
