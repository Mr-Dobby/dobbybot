const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');

bot.on("voiceStateUpdate", async (oldState, newState) => { 

  let fire = bot.emojis.cache.get("687436596391182344")
  let logName = await Logs.findOne( { guildID: oldState.guild.id } )
  const logchannel = bot.channels.cache.get(logName.serverLog)
  if (!logchannel) return;
  if (!logchannel.permissionsFor(oldState.guild.me).has('VIEW_CHANNEL')) return;
  if (!logchannel.permissionsFor(oldState.guild.me).has('ADMINISTRATOR')) return;
  let oldVoice = oldState.channelID; 
  let newVoice = newState.channelID;
  let newChannel = newState.member.voice.channel;
  let oldMember = oldState.member.user;

  if (oldVoice != newVoice) {
    if (oldVoice == null) {
      
      const joinVCEmbed = new Discord.MessageEmbed()
      .setAuthor(`${oldMember.tag} | Joined a voice channel`, oldMember.displayAvatarURL({ dynamic: true }))
      .setDescription(`<@${oldMember.id}> joined the **${newChannel}** voice channel ${fire}`)
      .setFooter(`Author ID: ${oldMember.id} • Channel ID: ${newVoice}`)
      .setColor("#ffc500")
      .setTimestamp()
    
      await logchannel.send(joinVCEmbed).catch()

    } else if (newVoice == null) {
      
      const leaveVCEmbed = new Discord.MessageEmbed()
      .setAuthor(`${oldMember.tag} | Left a voice channel`, oldMember.displayAvatarURL({ dynamic: true }))
      .setDescription(`<@${oldMember.id}> left the **<#${oldVoice}>** voice channel ${fire}`)
      .setFooter(`Author ID: ${oldMember.id} • Channel ID: ${oldVoice}`)
      .setColor("#ffc500")
      .setTimestamp()
   
      await logchannel.send(leaveVCEmbed).catch()

    } else {
      
      const changedVCEmbed = new Discord.MessageEmbed()
      .setAuthor(`${oldMember.tag} | Changed voice channel`, oldMember.displayAvatarURL({ dynamic: true }))
      .setDescription(`<@${oldMember.id}> switched from **<#${oldVoice}> ➞ <#${newVoice}>** ${fire}`)
      .setFooter(`Author ID: ${oldMember.id} • Channel ID: ${newVoice}`)
      .setColor("#ffc500")
      .setTimestamp()
    
      await logchannel.send(changedVCEmbed).catch()

    }
  }
  
});
