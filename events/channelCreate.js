const Discord = require("discord.js");
const {bot} = require('../index.js');
const Logs = require('../lib/logs');
const Servers = require("../lib/mongodb");
const colour = require('../storage/colours.json')

module.exports = async (bot, channel) => {

  var date = new Date();
  var hs = String(date.getHours()).padStart(2, '0');
  var min = String(date.getMinutes()).padStart(2, '0');
  var sec = String(date.getSeconds()).padStart(2, '0');

    let fire = bot.emojis.cache.get("687436596391182344")
    const guildsChannel = channel.guild;
    var category = channel.parent;
    if (!category) category = "None";
    if (!guildsChannel || !guildsChannel.available) return;
    const logName = await Logs.findOne( { guildID: guildsChannel.id } );
    const server = await Servers.findOne( { guildID: guildsChannel.id } );
    if (!logName) { return; }
    const logchannel = bot.channels.cache.get(logName.serverLog);
    let muterole = server.muteRole;
    let chatbanrole = server.chatbanRole;
    
    if (!logchannel) return;
    if (!logchannel.permissionsFor(channel.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(channel.guild.me).has('SEND_MESSAGES')) return;
    if (!logchannel.permissionsFor(channel.guild.me).has('EMBED_LINKS')) return;

    let types = {
      "text"      : "Text channel",
      "voice"     : "Voice channel",
      "category"  : "Category",
      "news"      : "Announcement",
      "store"     : "Store"
    };

    let channelCreateEmbed = new Discord.MessageEmbed()
    .setColor(colour.channels)
    .setAuthor(`${channel.guild.name} | Channel create`, channel.guild.iconURL({ dynamic: true }))
    .setDescription(`A new channel has been created ${fire}`)
    .addField("Channel name", `<#${channel.id}>`, true)
    .addField("Channel type", `${types[channel.type]}`, true)
    .addField("Category", category, true)
    .setFooter(`Channel ID: ${channel.id} • ${hs}:${min}:${sec}`)

    await logchannel.send(channelCreateEmbed).catch(error => console.log(error))

    if (!muterole) { return; }
    if (!chatbanrole) { return; }
    try {
      if (channel.type === "text") {
        channel.guild.channels.cache.forEach(async (channel) => {
          await channel.updateOverwrite(chatbanrole, { VIEW_CHANNEL: false, READ_MESSAGE_HISTORY: false });
          await channel.updateOverwrite(muterole, { SEND_MESSAGES: false, ADD_REACTIONS: false, SPEAK: false, STREAM: false });
//          await channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: null, VIEW_CHANNEL: null });
      });
    }
  } catch (e) { console.error(e) }
};