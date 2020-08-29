const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');

bot.on("channelCreate", async (channel) => {

    let fire = bot.emojis.cache.get("687436596391182344")
    const guildsChannel = channel.guild;
    var category = channel.parent;
    if (!category) category = "None";
    if (!guildsChannel || !guildsChannel.available) return;
    const logName = await Logs.findOne( { guildID: guildsChannel.id } );
    if (!logName) { return; }
    const logchannel = bot.channels.cache.get(logName.serverLog);

    if (!logchannel) return;
    if (!logchannel.permissionsFor(channel.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(channel.guild.me).has('ADMINISTRATOR')) return;

    let types = {
      "text"      : "Text channel",
      "voice"     : "Voice channel",
      "null"      : "None",
      "category"  : "Category"
    };

    let channelCreateEmbed = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setAuthor(`${channel.guild.name} | Channel create`, channel.guild.iconURL({ dynamic: true }))
    .setDescription(`A new channel has been created ${fire}`)
    .addField("Channel name", `<#${channel.id}>`, true)
    .addField("Channel type", `${types[channel.type]}`, true)
    .addField("Category:", category, true)
    .setFooter(`Channel ID: ${channel.id}`)
    .setTimestamp()

    await logchannel.send(channelCreateEmbed).catch(error => console.log(error))

});