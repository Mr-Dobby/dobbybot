const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  if (currPrefix.nsfw == true) {

    const nsfwEmbed0 = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | NSFW Channels`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription("**NSFW!!**")
      .setFooter(`You need Manage Channel permissions!`)
      .setTimestamp()
      .setImage('https://imgur.com/HmQ3ynK.png')
    
    message.channel.send(nsfwEmbed0)

  } else {

    const nsfwEmbed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | NSFW Channels`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription("**NSFW!!**")
      .setFooter(`You need Manage Channel permissions!\nIt also seems that NSFW is diabled in this server: \`${currPrefix.prefix}enable nsfw\``)
      .setTimestamp()
      .setImage('https://imgur.com/HmQ3ynK.png')
    
    message.channel.send(nsfwEmbed)
  
  }
}

module.exports.help = {
  name: "nsfwhuh",
  aliases: []
}
