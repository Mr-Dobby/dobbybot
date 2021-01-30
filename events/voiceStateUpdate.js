const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');
const colour = require('../storage/colours.json')

module.exports = async (bot, oldState, newState) => {

  var date = new Date();
  var hs = String(date.getHours()).padStart(2, '0');
  var min = String(date.getMinutes()).padStart(2, '0');
  var sec = String(date.getSeconds()).padStart(2, '0');

  let fire = bot.emojis.cache.get("687436596391182344")
  let logName = await Logs.findOne( { guildID: oldState.guild.id } )
  const logchannel = bot.channels.cache.get(logName.serverLog)
  if (!logchannel) return;
  if (!logchannel.permissionsFor(oldState.guild.me).has('VIEW_CHANNEL')) return;
  if (!logchannel.permissionsFor(oldState.guild.me).has('SEND_MESSAGES')) return;
  if (!logchannel.permissionsFor(oldState.guild.me).has('EMBED_LINKS')) return;
  let oldVoice = oldState.channelID; 
  let newVoice = newState.channelID;
  let newChannel = newState.member.voice.channel;
  let oldMember = oldState.member.user;

  if (oldVoice != newVoice) {
    if (oldVoice == null) {
      
      const joinVCEmbed = new Discord.MessageEmbed()
      .setAuthor(`${oldMember.tag} | Joined a voice channel`, oldMember.displayAvatarURL({ dynamic: true }))
      .setDescription(`<@${oldMember.id}> joined the **${newChannel}** voice channel ${fire}`)
      .setFooter(`Member ID: ${oldMember.id} • Channel ID: ${newVoice} • ${hs}:${min}:${sec}`)
      .setColor(colour.members)
    
      await logchannel.send(joinVCEmbed).catch()

    } else if (newVoice == null) {
      
      const leaveVCEmbed = new Discord.MessageEmbed()
      .setAuthor(`${oldMember.tag} | Left a voice channel`, oldMember.displayAvatarURL({ dynamic: true }))
      .setDescription(`<@${oldMember.id}> left the **<#${oldVoice}>** voice channel ${fire}`)
      .setFooter(`Member ID: ${oldMember.id} • Channel ID: ${oldVoice} • ${hs}:${min}:${sec}`)
      .setColor(colour.members)
   
      await logchannel.send(leaveVCEmbed).catch()

    } else {
      
      const changedVCEmbed = new Discord.MessageEmbed()
      .setAuthor(`${oldMember.tag} | Changed voice channel`, oldMember.displayAvatarURL({ dynamic: true }))
      .setDescription(`<@${oldMember.id}> switched from **<#${oldVoice}> ➞ <#${newVoice}>** ${fire}`)
      .setFooter(`Member ID: ${oldMember.id} • Channel ID: ${newVoice} • ${hs}:${min}:${sec}`)
      .setColor(colour.members)
    
      await logchannel.send(changedVCEmbed).catch()

    }
  }

};
