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
    let owner = bot.users.get("441478072559075328") || await client.fetchUser("441478072559075328");

    let botIcon = bot.user.displayAvatarURL({ dynamic: true });
    let botembed = new Discord.MessageEmbed()
        .setAuthor(`${bot.user.tag} | Information 🤖`, bot.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`\`${currPrefix.prefix}botinfo\` | Alias: \`binfo\``)
        .setColor("#010000")
        .setThumbnail(botIcon)
        .setURL('https://discordapp.com/oauth2/authorize?client_id=570525775351119872&scope=bot&permissions=268443694')
        .addField("➞ Bot", `ID: ${bot.user.id}`, true)
        .addField("➞ Bot Created On", created, true)
        .addField(`➞ Libaries`, `Discord.js v11.6.4\nNode.js ${process.version}`, true)
        .addField("➞ Bot Uptime", `${duration(bot.uptime)}`, true)
        .setFooter(`Created by: Mr. Dobby#0001`, owner.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

        message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo",
  aliases: ["binfo"]
}
