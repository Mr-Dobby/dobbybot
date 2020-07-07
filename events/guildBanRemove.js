const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');

bot.on("guildBanRemove", async (guild, user) => {

    let fire = bot.emojis.get("687436596391182344")
    let logName = await Logs.findOne( { guildID: guild.id } )
    const logchannel = bot.channels.get(logName.serverLog)
    if (!logchannel) return;
    if (!logchannel.permissionsFor(guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(guild.me).has('ADMINISTRATOR')) return;
    let banCount = (await guild.fetchBans()).size;

    const embed = new Discord.RichEmbed()
    .setAuthor(`${user.tag} | Unbanned`, user.displayAvatarURL)
    .setColor("#7aff7a")
    .setThumbnail("https://cdn.discordapp.com/attachments/682717976771821646/691316470243786852/Unbanned.png")
    .setDescription(`${user} is now unbanned ${fire}`)
    .setFooter(`Member ID: ${user.id} • ${banCount} Banned Members`)
    .setTimestamp()

    logchannel.send(embed)

});