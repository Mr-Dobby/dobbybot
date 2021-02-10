const Discord = require("discord.js");
const bug = require("../../lib/bugs.js")

module.exports.run = async (bot, message, args) => {

  let BRC = args[0];
  if (!BRC) { return; }
  if (message.guild.id !== "783354482830475285") { return; }
  if (!message.author.hasPermissions("MANAGE_MESSAGES")) { return; }
  try {

    const foundBug = await bug.findOne( { bugReportCode: BRC } );
    let member = await bot.users.cache.get(foundBug.authorID);
    let guild = await bot.guilds.cache.get(foundBug.guildID);
    let channel = await bot.channels.cache.get(foundBug.channelID);
    const reportEmbed = new Discord.MessageEmbed()
        .setAuthor(`${member.tag} | Information on reported bug`, member.displayAvatarURL({ dynamic: true }))
        .setColor(`RANDOM`)
        .setDescription(`BRC: \`${foundBug.bugReportCode}\``)
        .addField(`Error Message`, `${foundBug.bugMessage}`, false)
        .addField(`Reported from/by`, `${member.toString()} (${member.id})\n${guild.toString()} (${guild.id})\n${channel.toString()} (${channel.id})`, false)
        .setFooter(`Reported at: ${foundBug.reportedAt}`)

    return message.channel.send(reportEmbed)

  } catch (e) {

    return message.channel.send(`Cannot find a report with this BRC`)

  }

}

module.exports.help = {
  name: "bug",
  aliases: ["viewbug"]
}
