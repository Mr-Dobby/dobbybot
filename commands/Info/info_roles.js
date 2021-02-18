const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const roles = message.guild.roles.cache.array().sort((a, b) => b.position - a.position)
    const generateEmbed = start => {
      const current = roles.slice(start, start + 10)
      const embed = new Discord.MessageEmbed()
      .setFooter(`Showing Roles ${start + 1}-${start + current.length} out of ${roles.length}`, bot.user.displayAvatarURL())
      current.forEach(g => embed.addField(`**${g.id}**`, `**Name:** ${g.toString()}\n**Color:** ${g.hexColor}`))
      return embed
    }

    const author = message.author

    message.channel.send(generateEmbed(0)).then(message => {
        if (roles.length <= 10) { return; }
        message.react('➡️')
        const collector = message.createReactionCollector(
          (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
          {time: 60000}
        )
      
        let currentIndex = 0
        collector.on('collect', reaction => {
          message.reactions.removeAll().then(async () => {
            reaction.emoji.name === '⬅️' ? currentIndex -= 10 : currentIndex += 10
            message.edit(generateEmbed(currentIndex))

            if (currentIndex !== 0) await message.react('⬅️')
            if (currentIndex + 10 < roles.length) message.react('➡️')
          })
        })
      })
}


module.exports.help = {
  name: "roles",
  aliases: []
}
