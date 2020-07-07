const Discord = require("discord.js");
const ms = require("ms");
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

      let errorTimeEmbed = new Discord.RichEmbed()
          .setColor("#FF0000")
          .setTitle(":x: You need to specify when the timer goes off! :x:")
          .setDescription(`Examples:\n\`${currPrefix}timer 10s\`\n\`${currPrefix}timer 1m\`\n\`currPrefixtimer 1h\``)
          .setTimestamp()

      let errorArgumentEmbed = new Discord.RichEmbed()
          .setColor("#FF0000")
          .setTitle(":x: You need to specify an argument :x:")
          .setDescription(`Examples:\n\`${currPrefix}timer 1h Gotta work in an hour!`)
          .setTimestamp()

        let timer = args[0];
        if (!timer) return message.channel.send(errorTimeEmbed)

        let argument = args.slice(1).join(" ");
        if (!argument) return  message.channel.send(errorArgumentEmbed)

      let embed = new Discord.RichEmbed()
          .setDescription(`Okay, I'll count down, and let you know when the time is up!\n Keep an eye on your **DMs!**`)
          .setFooter(`Timer is set to ${ms(ms(timer), { long: true})}`)
          .setColor("#30FF00")
          .setTimestamp()

      message.delete()
      message.channel.send({embed: embed})

  setTimeout(function() {

    embed.setAuthor(`Argument: ${argument}`)
    embed.setDescription(`:alarm_clock: BEEP! Time's up! <@${message.author.id}>`)
    embed.setColor("FF0000")
    embed.setFooter(`You set the timer ${ms(ms(timer), { long: true})} ago.`)

    message.author.send({embed: embed}).catch(err => console.log(err));

  }, ms(timer));
}

module.exports.help = {
  name: "timer",
  aliases: []
}
