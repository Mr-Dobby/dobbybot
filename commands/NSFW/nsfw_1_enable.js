const Discord = require(`discord.js`);
const Servers = require(`../../lib/mongodb`);

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  if (currPrefix.nsfw == true) {

    const nsfwEmbed0 = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | NSFW Channels`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`**Server-wide NSFW!!**\n\nThis isn't a NSFW channel.\nYou can disable NSFW for the entire server with: \`${currPrefix.prefix}disable nsfw\``)
      .setImage('https://imgur.com/HmQ3ynK.png')
      .setColor(`#ff1595`)
    
    message.channel.send(nsfwEmbed0)

  } else {

    const nsfwEmbed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | NSFW Channels`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`**Server-wide NSFW!!**\n\nThis isn't a NSFW channel.\nIt also seems that NSFW is diabled for the server: \`${currPrefix.prefix}enable nsfw\``)
      .setImage('https://imgur.com/HmQ3ynK.png')
      .setColor(`#ff1595`)
    
    message.channel.send(nsfwEmbed)
  
  }
}

module.exports.help = {
  name: `nsfwhuh`,
  aliases: []
}
