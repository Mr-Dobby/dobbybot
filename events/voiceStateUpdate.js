const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');

bot.on("voiceStateUpdate", async (oldMember, newMember) => {

    let fire = bot.emojis.get("687436596391182344")
    let logName = await Logs.findOne( { guildID: oldMember.guild.id } )
    const logchannel = bot.channels.get(logName.serverLog)
    if (!logchannel) return;
    if (!logchannel.permissionsFor(newMember.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(newMember.guild.me).has('ADMINISTRATOR')) return;

    let oldChannel = oldMember.voiceChannel; // the previous channel, if there was one
    let newChannel = newMember.voiceChannel; // the current channel, if there is one

    if (oldChannel === undefined && newChannel !== undefined) {
    // User Joins a voice channel

    const joinVCEmbed = new Discord.RichEmbed()
    .setAuthor(`${oldMember.user.tag} | Joined a voice channel`, oldMember.user.displayAvatarURL)
    .setDescription(`**<@${oldMember.id}> joined the ${newChannel} voice channel** ${fire}`)
    .setFooter(`Author ID: ${oldMember.id} • Channel ID: ${newChannel.id}`)
    .setColor("#ffc500")
    .setTimestamp()

    await logchannel.send(joinVCEmbed).catch()
 
   } else if (newChannel === undefined) {
     // User leaves a voice channel

     const leaveVCEmbed = new Discord.RichEmbed()
     .setAuthor(`${oldMember.user.tag} | Left a voice channel`, oldMember.user.displayAvatarURL)
     .setDescription(`**<@${oldMember.id}> left the ${oldChannel} voice channel** ${fire}`)
     .setFooter(`Author ID: ${oldMember.id} • Channel ID: ${oldChannel.id}`)
     .setColor("#ffc500")
     .setTimestamp()

     await logchannel.send(leaveVCEmbed).catch()

   }

   if (oldChannel !== newChannel && oldChannel !== undefined && newChannel !== undefined) { 
    // If old channel isn't the same as new, & if neither the new or old are undefined  
    
    const changedVCEmbed = new Discord.RichEmbed()
    .setAuthor(`${oldMember.user.tag} | Changed voice channel`, oldMember.user.displayAvatarURL)
    .setDescription(`**<@${oldMember.id}> switched from ${oldChannel} ➞ ${newChannel}** ${fire}`)
    .setFooter(`Author ID: ${oldMember.id} • Channel ID: ${newChannel.id}`)
    .setColor("#ffc500")
    .setTimestamp()

    await logchannel.send(changedVCEmbed).catch()

  }

});