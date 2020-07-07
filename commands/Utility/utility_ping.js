const Discord = require("discord.js");

module.exports.run = async (bot, message, args, client) => {

  let embed1 = new Discord.RichEmbed()
  .setAuthor(`${message.author.tag} | Ping request`, message.author.displayAvatarURL)
  .setDescription("**Hold on, pinging . . .**")

  message.channel.send(embed1).then(ping => {

    message.channel.bulkDelete(1, true)
    
      let PreviousPings = Math.round(bot.pings);
      if (isNaN(PreviousPings)) PreviousPings = bot.pings;

      let TheEmbed = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | Ping request`, message.author.displayAvatarURL)
/*   
      let embedGood = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | Ping request`, message.author.displayAvatarURL)
      .setDescription(`Message Latency: **${ping.createdTimestamp - message.createdTimestamp} ms** \`Fast\`\nAverage API Latency: **${Math.round(bot.ping)} ms\n**Previous API Latency: **${PreviousPings} ms**`)
      .setColor("#6bff2b")
    
      let embedAvg = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | Ping request`, message.author.displayAvatarURL)
      .setDescription(`Message Latency: **${ping.createdTimestamp - message.createdTimestamp} ms** \`Average\`\nAverage API Latency: **${Math.round(bot.ping)} ms\n**Previous API Latency: **${PreviousPings} ms**`)
      .setColor("#ffa32b")
    
      let embedBad = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag} | Ping request`, message.author.displayAvatarURL)
      .setDescription(`Message Latency: **${ping.createdTimestamp - message.createdTimestamp} ms** \`Slow\`\nAverage API Latency: **${Math.round(bot.ping)} ms\n**Previous API Latency: **${PreviousPings} ms**`)
      .setColor("#ff2b2b")
*/    
      if ((ping.createdTimestamp - message.createdTimestamp) <= 150) {
        TheEmbed
        .setDescription(`Message Latency: **${ping.createdTimestamp - message.createdTimestamp} ms** \`Fast\`\nAverage API Latency: **${Math.round(bot.ping)} ms\n**Previous API Latency: **${PreviousPings} ms**`)
        .setColor("#6bff2b")
        message.channel.send(TheEmbed)
      } else if ((ping.createdTimestamp - message.createdTimestamp) <= 300) {
        TheEmbed
        .setDescription(`Message Latency: **${ping.createdTimestamp - message.createdTimestamp} ms** \`Average\`\nAverage API Latency: **${Math.round(bot.ping)} ms\n**Previous API Latency: **${PreviousPings} ms**`)
        .setColor("#ffa32b")
        message.channel.send(TheEmbed)
      } else {
        TheEmbed
        .setDescription(`Message Latency: **${ping.createdTimestamp - message.createdTimestamp} ms** \`Slow\`\nAverage API Latency: **${Math.round(bot.ping)} ms\n**Previous API Latency: **${PreviousPings} ms**`)
        .setColor("#ff2b2b")
        message.channel.send(TheEmbed)
      }
  })

}

module.exports.help = {
  name: "ping",
  aliases: []
}
