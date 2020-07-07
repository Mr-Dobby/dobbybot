const Discord = require("discord.js");
const Warns = require("../../lib/warns");
const mongoose = require('mongoose');
const Servers = require("../../lib/mongodb");
mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
        if (err) return console.error(err);
});

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send('You need `MANAGE MESSAGES` permission')
    }

    const Failure = bot.emojis.get("697388354689433611");

    const warningsErrorEmbed = new Discord.RichEmbed()
        .setColor("#ff4f4f")
        .setTitle(`\`Command: ${currPrefix.prefix}warnings\``)
        .addField("**Description:**", "Check how many warnings a member has for the server.")
        .addField("**Command usage:**", `${currPrefix.prefix}warnings <@User>`)
        .addField("**Example:**", `${currPrefix.prefix}warnings @Mr.Dobby#0001`)
        .setFooter("<> = Required, [] = Optional")

    let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!member) return message.channel.send(warningsErrorEmbed)

    const NoWarnsEmbed = new Discord.RichEmbed()
        .setColor("#ff0000")
        .setAuthor(`${message.author.tag} | Warnings`, message.author.displayAvatarURL)
        .setDescription(`${Failure} <@${member.user.id}> has no warns.`)

    const Embed1 = new Discord.RichEmbed()
        .setAuthor(`${member.user.tag} | Warnings`, member.user.displayAvatarURL)

    Warns.find(
      {
        guildID: message.guild.id,
        warnedID: member.id
      },
      async (err, data) => {
        if (err) console.error(err);
        if (!data.length) {
          return message.channel.send(NoWarnsEmbed);
      }

      data.map(function(d) {

        d.moderator;
        d.reason;
        Embed1.setDescription(`Moderator\n${d.moderator}\nReason\n${d.reason}`, true)

      }
    )
    message.channel.send(Embed1)
  })

}

module.exports.help = {
  name: "warnings",
  aliases: []
}
