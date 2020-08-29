const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');

bot.on("messageUpdate", async (oldMessage, newMessage) => {

    if (oldMessage.content === newMessage.content) {
      return;
    }

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
    .setColor("#ff0000")
    .setDescription(`Message sent by <@${newMessage.author.id}> edited in <#${newMessage.channel.id}> ${fire}\n⟶ [Jump To Message](${JumpToMsg}) ⟵`)
    .addField("Original message", oldMessages, true)
    .addField("Edited message", newMessages, true)
    .setFooter(`Member ID: ${oldMessage.author.id} • Message ID: ${oldMessage.id}`)
    .setTimestamp()

    if (!logchannel) return;
    if (!logchannel.permissionsFor(oldMessage.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(oldMessage.guild.me).has('ADMINISTRATOR')) return;

    await logchannel.send(messageUpdateEmbed)

});
