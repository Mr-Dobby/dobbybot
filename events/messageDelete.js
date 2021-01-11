const Discord = require("discord.js");
const {bot} = require('../index');
const Servers = require("../lib/mongodb");
const Logs = require("../lib/logs");
const colour = require('../storage/colours.json')

module.exports = async (bot, messageDelete) => {

    let currPrefix = await Servers.findOne( { guildID: messageDelete.guild.id } )

    var date = new Date();
    var hs = String(date.getHours()).padStart(2, '0');
    var min = String(date.getMinutes()).padStart(2, '0');
    var sec = String(date.getSeconds()).padStart(2, '0');

    let deletedMessage = messageDelete.content;
    if (!deletedMessage) return;
    if (deletedMessage.startsWith(currPrefix.prefix)) return;
    let fire = bot.emojis.cache.get("687436596391182344")
    let logName = await Logs.findOne( { guildID: messageDelete.guild.id } )
    const logchannel = bot.channels.cache.get(logName.serverLog)

    let messageDeleteEmbed = new Discord.MessageEmbed()
    .setAuthor(`${messageDelete.author.tag} | Message delete`, messageDelete.author.displayAvatarURL({ dynamic: true }))
    .setColor(colour.messages)
    .setDescription(`Message sent by <@${messageDelete.author.id}> deleted in <#${messageDelete.channel.id}> ${fire}`)
    .addField("Message content", deletedMessage)
    .setFooter(`Member ID: ${messageDelete.author.id} • Message ID: ${messageDelete.id} • ${hs}:${min}:${sec}`)

    if (!logchannel) return;
    if (!logchannel.permissionsFor(messageDelete.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(messageDelete.guild.me).has('SEND_MESSAGES')) return;
    if (!logchannel.permissionsFor(messageDelete.guild.me).has('EMBED_LINKS')) return;
    
    await logchannel.send(messageDeleteEmbed).catch(error => console.log(error))

};