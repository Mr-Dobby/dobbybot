const Discord = require("discord.js");
const bug = require("../../lib/bugs");

module.exports.run = async (bot, message, args) => {

  let supporter = message.guild.members.cache.get(message.author.id);
  if (!supporter.roles.cache.find(r => r.id == "801473221055479829" || "801473307098087464" || "783355962781990923")) { return; }
  if (message.guild.id !== "783354482830475285") { return; }
  let BRC = args[0];
  let emoji = bot.emojis.cache.get("611335477282340885");
  const Sucess = bot.emojis.cache.get("697388354668462110");
  if (!BRC) { return; }
  try {

    const foundBug = await bug.findOneAndDelete( { bugReportCode: BRC } );
    let member = await bot.users.cache.get(foundBug.authorID);
    let channel = await bot.channels.cache.get(foundBug.channelID);

    const reportEmbed = new Discord.MessageEmbed()
        .setAuthor(`${supporter.user.tag} | Reported Bug Has Been Resolved`, supporter.user.displayAvatarURL({ dynamic: true }))
        .setColor("#7aff7a")
        .setDescription(`${Sucess} Resolved Bug Where BRC Is: \`${foundBug.bugReportCode}\``)

    const bugResolvedEmbed = new Discord.MessageEmbed()
        .setAuthor(`Reported Bug Resolved by our supporter, ${supporter.user.tag}`, supporter.user.displayAvatarURL({ dynamic: true }))
        .setColor("#7aff7a")
        .setDescription(`BRC: \`${foundBug.bugReportCode}\``)
        .addField(`Error Message`, `${foundBug.bugMessage}`, false)
        .addField(`Reported by`, `${member.tag} | ${member.toString()}`, true)
        .addField(`Reported at`, `${foundBug.reportedAt}`, true)
        .setFooter(`If this is a mistake, please report the bug again.`)

    channel.send(bugResolvedEmbed)

    return message.channel.send(reportEmbed)

  } catch (e) {

    return message.channel.send(`Failed to resolve this bug, perhaps create this as a bug yourself ${emoji}`)

  }

}

module.exports.help = {
  name: "bugresolve",
  aliases: ["resolvebug"]
}
