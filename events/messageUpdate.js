const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');
const colour = require('../storage/colours.json')

module.exports = async (bot, oldMessage, newMessage) => {

    if (oldMessage.content === newMessage.content) {
      return;
    }

    var date = new Date();
    var hs = String(date.getHours()).padStart(2, '0');
    var min = String(date.getMinutes()).padStart(2, '0');
    var sec = String(date.getSeconds()).padStart(2, '0');

    let fire = bot.emojis.cache.get("687436596391182344")
    let logName = await Logs.findOne( { guildID: oldMessage.guild.id } )
    const logchannel = bot.channels.cache.get(logName.serverLog)
    let oldMessages = oldMessage.content;
    let newMessages = newMessage.content
    if (!oldMessage.content) return;
    if (!newMessage.content) return;
    let JumpToMsg = newMessage.url;

    let messageUpdateEmbed = new Discord.MessageEmbed()
    .setAuthor(`${newMessage.author.tag} | Message update`, newMessage.author.displayAvatarURL({ dynamic: true }))
    .setColor(colour.messages)
    .setDescription(`Message sent by <@${newMessage.author.id}> edited in <#${newMessage.channel.id}> - [URL](${JumpToMsg}) ${fire}`)
    .addField("Original message", oldMessages, true)
    .addField("Edited message", newMessages, true)
    .setFooter(`Member ID: ${oldMessage.author.id} • Message ID: ${oldMessage.id} • ${hs}:${min}:${sec}`)

    if (!logchannel) return;
    if (!logchannel.permissionsFor(oldMessage.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(oldMessage.guild.me).has('SEND_MESSAGES')) return;
    if (!logchannel.permissionsFor(oldMessage.guild.me).has('EMBED_LINKS')) return;

    await logchannel.send(messageUpdateEmbed)

};
