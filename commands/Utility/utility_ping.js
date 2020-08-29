const Discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {

  let embed1 = new Discord.MessageEmbed()
  .setAuthor(`${message.author.tag} | Ping request`, message.author.displayAvatarURL({ dynamic: true }))
  .setDescription("**Hold on, pinging . . .**")

  message.channel.send(embed1).then(m => {

    message.channel.bulkDelete(1, true)
    
      let TheEmbed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Ping request`, message.author.displayAvatarURL({ dynamic: true }))
/*   
      let embedGood = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Ping request`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`Message Latency: **${ping.createdTimestamp - message.createdTimestamp} ms** \`Fast\`\nAverage API Latency: **${Math.round(bot.ping)} ms\n**Previous API Latency: **${PreviousPings} ms**`)
      .setColor("#6bff2b")
    
      let embedAvg = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Ping request`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`Message Latency: **${ping.createdTimestamp - message.createdTimestamp} ms** \`Average\`\nAverage API Latency: **${Math.round(bot.ping)} ms\n**Previous API Latency: **${PreviousPings} ms**`)
      .setColor("#ffa32b")
    
      let embedBad = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} | Ping request`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`Message Latency: **${ping.createdTimestamp - message.createdTimestamp} ms** \`Slow\`\nAverage API Latency: **${Math.round(bot.ping)} ms\n**Previous API Latency: **${PreviousPings} ms**`)
      .setColor("#ff2b2b")
*/    
      if ((m.createdTimestamp - message.createdTimestamp) <= 150) {
        TheEmbed
        .setDescription(`Message Latency: **${m.createdTimestamp - message.createdTimestamp} ms** \`Fast\`\nAverage API Latency: **${Math.round(bot.ws.ping)} ms**`)
        .setColor("#6bff2b")
        message.channel.send(TheEmbed)
      } else if ((m.createdTimestamp - message.createdTimestamp) <= 300) {
        TheEmbed
        .setDescription(`Message Latency: **${m.createdTimestamp - message.createdTimestamp} ms** \`Average\`\nAverage API Latency: **${Math.round(bot.ws.ping)} ms**`)
        .setColor("#ffa32b")
        message.channel.send(TheEmbed)
      } else {
        TheEmbed
        .setDescription(`Message Latency: **${m.createdTimestamp - message.createdTimestamp} ms** \`Slow\`\nAverage API Latency: **${Math.round(bot.ws.ping)} ms**`)
        .setColor("#ff2b2b")
        message.channel.send(TheEmbed)
      }
  })

}

module.exports.help = {
  name: "ping",
  aliases: []
}
