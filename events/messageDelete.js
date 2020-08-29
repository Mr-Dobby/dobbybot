const Discord = require("discord.js");
const {bot} = require('../index');
const Servers = require("../lib/mongodb");
const Logs = require("../lib/logs");

bot.on("messageDelete", async (messageDelete) => {

    let currPrefix = await Servers.findOne( { guildID: messageDelete.guild.id } )

    let deletedMessage = messageDelete.content;
    if (!deletedMessage) return;
    if (deletedMessage.startsWith(currPrefix.prefix)) return;
    let fire = bot.emojis.cache.get("687436596391182344")
    let logName = await Logs.findOne( { guildID: messageDelete.guild.id } )
    const logchannel = bot.channels.cache.get(logName.serverLog)

    let messageDeleteEmbed = new Discord.MessageEmbed()
    .setAuthor(`${messageDelete.author.tag} | Message delete`, messageDelete.author.displayAvatarURL({ dynamic: true }))
    .setColor("#ff0000")
    .setDescription(`Message sent by <@${messageDelete.author.id}> deleted in <#${messageDelete.channel.id}> ${fire}`)
    .addField("Message content", deletedMessage)
    .setFooter(`Member ID: ${messageDelete.author.id} • Message ID: ${messageDelete.id} `)
    .setTimestamp()

    if (!logchannel) return;
    if (!logchannel.permissionsFor(messageDelete.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(messageDelete.guild.me).has('ADMINISTRATOR')) return;

    await logchannel.send(messageDeleteEmbed).catch(error => console.log(error))

});