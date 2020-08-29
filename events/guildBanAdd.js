const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');

bot.on("guildBanAdd", async (guild, user) => {

    let fire = bot.emojis.cache.get("687436596391182344")
    let logName = await Logs.findOne( { guildID: guild.id } )
    const logchannel = bot.channels.cache.get(logName.serverLog)
    if (!logchannel) return;
    if (!logchannel.permissionsFor(guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(guild.me).has('ADMINISTRATOR')) return;
    let banCount = (await guild.fetchBans()).size;

    const embed = new Discord.MessageEmbed()
    .setAuthor(`${user.tag} | Banned`, user.displayAvatarURL({ dynamic: true }))
    .setColor("#ff0000")
    .setThumbnail("https://cdn.discordapp.com/attachments/682717976771821646/691314675006308422/Banned.png") 
    .setDescription(`${user} is now banned ${fire}`)
    .setFooter(`Member ID: ${user.id} • ${banCount} Banned Members`)
    .setTimestamp()

    logchannel.send(embed)

});