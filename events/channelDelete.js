const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');
const colour = require('../storage/colours.json')

module.exports = async (bot, channel) => {

  var date = new Date();
  var hs = String(date.getHours()).padStart(2, '0');
  var min = String(date.getMinutes()).padStart(2, '0');
  var sec = String(date.getSeconds()).padStart(2, '0');

    let fire = bot.emojis.cache.get("687436596391182344")
    let guildsChannel = channel.guild;
    let category = channel.parent;
    if (!category) category = "None";
    if (!guildsChannel || !guildsChannel.available) return;
    let logName = await Logs.findOne( { guildID: guildsChannel.id } );
    if (!logName) { return; }
    const logchannel = bot.channels.cache.get(logName.serverLog);

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

    let channelDeleteEmbed = new Discord.MessageEmbed()
    .setColor(colour.channels)
    .setAuthor(`${channel.guild.name} | Channel delete`, channel.guild.iconURL({ dynamic: true }))
    .setDescription(`A channel has been deleted ${fire}`)
    .addField("Channel name", `#${channel.name}`, true)
    .addField("Channel type", `${types[channel.type]}`, true)
    .addField("Category", category, true)
    .setFooter(`Channel ID: ${channel.id} • ${hs}:${min}:${sec}`)

    await logchannel.send(channelDeleteEmbed).catch(error => console.log(error))

};
