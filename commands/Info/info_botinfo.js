const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const moment = require("moment");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  function duration(ms) {
    const sec = Math.floor((ms / 1000) % 60).toString()
    const min = Math.floor((ms / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
    return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes and ${sec.padStart(2, '0')} seconds`
  };

    moment.locale("en-gb");
    let created = moment(bot.user.createdAt).format('L');
    let owner = bot.users.cache.get("441478072559075328") || await bot.users.fetch("441478072559075328");

    let botIcon = bot.user.displayAvatarURL({ dynamic: true });
    let botembed = new Discord.MessageEmbed()
        .setAuthor(`${bot.user.tag} | Bot Information`, bot.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`\`${currPrefix.prefix}botinfo\` | Alias: \`binfo\``)
        .setColor("#010000")
        .setThumbnail(botIcon)
        .addField("➞ Bot", `ID: ${bot.user.id}`, true)
        .addField("➞ Bot Created On", created, true)
        .addField(`➞ Libaries`, `Discord.js v12.3.1\nNode.js ${process.version}`, true)
        .addField("➞ Bot Uptime", `${duration(bot.uptime)}`, true)
        .setFooter(`Created by: ${owner.tag}`, owner.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

        message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo",
  aliases: ["binfo"]
}
