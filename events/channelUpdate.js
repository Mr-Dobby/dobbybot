const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');
const colour = require('../storage/colours.json')

module.exports = async (bot, oldChannel, newChannel) => {

    var date = new Date();
    var hs = String(date.getHours()).padStart(2, '0');
    var min = String(date.getMinutes()).padStart(2, '0');
    var sec = String(date.getSeconds()).padStart(2, '0');
    
    let fire = bot.emojis.cache.get("687436596391182344");
    const guildsChannel = newChannel.guild;
    if (!guildsChannel || !guildsChannel.available) return;
    
    const logName = await Logs.findOne( { guildID: guildsChannel.id } );
    const logchannel = bot.channels.cache.get(logName.serverLog)
    if (!logchannel) return;
    if (!logchannel.permissionsFor(oldChannel.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(oldChannel.guild.me).has('SEND_MESSAGES')) return;
    if (!logchannel.permissionsFor(oldChannel.guild.me).has('EMBED_LINKS')) return;

    let oldCategory = oldChannel.parent;
    let newCategory = newChannel.parent;
    if (!newCategory) newCategory = "None";
    let types = {
        "text"      : "Text channel",
        "voice"     : "Voice channel",
        "category"  : "Category",
        "news"      : "Announcement",
        "store"     : "Store"
    };

    if (oldChannel.name !== newChannel.name) {
    
        let channelNameUpdateEmbed = new Discord.MessageEmbed()
        .setColor(colour.channels)
        .setAuthor(`${oldChannel.guild.name} | Channel update`, newChannel.guild.iconURL({ dynamic: true }))
        .setDescription(`${newChannel.toString()} updated name ${fire}`)
        .addField("Old name", `${oldChannel.name}`, true)
        .addField("New name", `__**${newChannel.name}**__`, true)
        .setFooter(`Channel ID: ${newChannel.id} • ${hs}:${min}:${sec}`)
        
        logchannel.send(channelNameUpdateEmbed).catch()
    
    }
    
    if (oldChannel.parent !== newChannel.parent && oldChannel.parent !== null && newChannel.parent !== null) {
    
        let channelParentUpdateEmbed = new Discord.MessageEmbed()
        .setColor(colour.channels)
        .setAuthor(`${oldChannel.guild.name} | Channel update`, newChannel.guild.iconURL({ dynamic: true }))
        .setDescription(`${newChannel.toString()} updated category ${fire}`)
        .addField("Old category", `${oldCategory}`, true)
        .addField("New category", `__**${newCategory}**__`, true)
        .setFooter(`Channel ID: ${newChannel.id} • ${hs}:${min}:${sec}`)
        
        logchannel.send(channelParentUpdateEmbed).catch()
        
    }
    
};