const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');

bot.on("channelUpdate", async (oldChannel, newChannel) => {

    let fire = bot.emojis.get("687436596391182344");
    const guildsChannel = newChannel.guild;
    if (!guildsChannel || !guildsChannel.available) return;
    const logName = await Logs.findOne( { guildID: guildsChannel.id } );
    const logchannel = bot.channels.get(logName.serverLog)
    if (!logchannel) return;
    if (!logchannel.permissionsFor(oldChannel.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(oldChannel.guild.me).has('ADMINISTRATOR')) return;
    const ignoreChannels = [
            '667335552558956554', 
            '667335645894541331', 
            '667337560179343374', 
            '687333146613776424', 
            '687333066934714490', 
            '687332936936063033',
            '723638087929823233'
            ];
            // Get stat channel IDs
            if (ignoreChannels.includes(oldChannel.id)) return;
            // Ignore these channels
    
            let oldCategory = oldChannel.parent;
            let newCategory = newChannel.parent;
            if (!newCategory) newCategory = "None";
    
            let types = {
              "text"  : "Text channel",
              "voice" : "Voice channel",
              "null"  : "None"
            };
    
            if (oldChannel.name !== newChannel.name) {
    
            let channelNameUpdateEmbed = new Discord.RichEmbed()
            .setColor("#ffc500")
            .setAuthor(`${oldChannel.guild.name} | Channel update`, newChannel.guild.iconURL)
            .setDescription(`Channel update | Name updated ${fire}`)
            .addField("Old channel name", `${oldChannel.name}`, true)
            .addBlankField(true)
            .addField("New channel name", `__**${newChannel.name}**__`, true)
            .addField("Channel type", `${types[newChannel.type]}`, true)
            .addBlankField(true)
            .addField("Channel category", `${newCategory}`, true)
            .setFooter(`Channel ID: ${newChannel.id}`)
            .setTimestamp()
    
            logchannel.send(channelNameUpdateEmbed).catch()
    
            }
    
            if (oldChannel.parent !== newChannel.parent && oldChannel.parent !== null && newChannel.parent !== null) {
    
            let channelParentUpdateEmbed = new Discord.RichEmbed()
            .setColor("#ffc500")
            .setAuthor(`${oldChannel.guild.name} | Channel update`, newChannel.guild.iconURL)
            .setDescription(`Channel update | Category updated ${fire}`)
            .addField("Old channel category", `${oldCategory}`, true)
            .addBlankField(true)
            .addField("New channel category", `__**${newCategory}**__`, true)
            .addField("Channel name", `${oldChannel.toString()}`, true)
            .addBlankField(true)
            .addField("Channel type", `${types[newChannel.type]}`, true)
            .setFooter(`Channel ID: ${newChannel.id}`)
            .setTimestamp()
    
            logchannel.send(channelParentUpdateEmbed).catch()
    
            }
    
});