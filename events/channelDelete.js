const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');

bot.on("channelDelete", async (channel) => {

    let fire = bot.emojis.get("687436596391182344")
    let guildsChannel = channel.guild;
    let category = channel.parent;
    if (!category) category = "None";
    if (!guildsChannel || !guildsChannel.available) return;
    let logName = await Logs.findOne( { guildID: guildsChannel.id } );
    const logchannel = bot.channels.get(logName.serverLog);

    if (!logchannel) return;
    if (!logchannel.permissionsFor(channel.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(channel.guild.me).has('ADMINISTRATOR')) return;


    let types = {
      "text"  : "Text channel",
      "voice" : "Voice channel",
      "null"  : "None"
    };

    let channelDeleteEmbed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setAuthor(`${channel.guild.name} | Channel delete`, channel.guild.iconURL)
    .setDescription(`A channel has been deleted ${fire}`)
    .addField("Channel name", `#${channel.name}`, true)
    .addField("Channel type", `${types[channel.type]}`, true)
    .addField("Category:", category, true)
    .setFooter(`Channel ID: ${channel.id}`)
    .setTimestamp()

    await logchannel.send(channelDeleteEmbed).catch(error => console.log(error))

});
