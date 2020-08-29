const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

            const nsfwEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag} | NSFW Channels`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription("**NSFW!!** | Aliases: `nsfw`, `ennsfw`")
            .setFooter(`You need Manage Channel permissions!`)
            .setTimestamp()
            .setImage('https://imgur.com/HmQ3ynK.png')

            message.channel.send({embed: nsfwEmbed})

}

module.exports.help = {
  name: "nsfwhuh",
  aliases: ["nsfw", "ennsfw"]
}
