const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');
const colour = require('../storage/colours.json')

module.exports = async (bot, guild, user) => {

    var date = new Date();
    var hs = String(date.getHours()).padStart(2, '0');
    var min = String(date.getMinutes()).padStart(2, '0');
    var sec = String(date.getSeconds()).padStart(2, '0');

    let fire = bot.emojis.cache.get("687436596391182344")
    let logName = await Logs.findOne( { guildID: guild.id } )
    const logchannel = bot.channels.cache.get(logName.serverLog)
    if (!logchannel) return;
    if (!logchannel.permissionsFor(guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(guild.me).has('SEND_MESSAGES')) return;
    if (!logchannel.permissionsFor(guild.me).has('EMBED_LINKS')) return;
    let banCount = (await guild.fetchBans()).size;

    const embed = new Discord.MessageEmbed()
    .setAuthor(`${user.tag} | Unbanned`, user.displayAvatarURL({ dynamic: true }))
    .setColor(colour.bans)
    .setThumbnail("https://cdn.discordapp.com/attachments/682717976771821646/691316470243786852/Unbanned.png")
    .setDescription(`${user} is now unbanned ${fire}`)
    .setFooter(`Member ID: ${user.id} • ${banCount} Banned Members • ${hs}:${min}:${sec}`)

    logchannel.send(embed)

};