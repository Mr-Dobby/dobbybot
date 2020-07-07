const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');

bot.on("guildMemberUpdate", async (oldMember, newMember) => {

    let fire = bot.emojis.get("687436596391182344")
    let logName = await Logs.findOne( { guildID: oldMember.guild.id } )
    const logchannel = bot.channels.get(logName.serverLog)
    if (!logchannel) return;
    if (!logchannel.permissionsFor(oldMember.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(oldMember.guild.me).has('ADMINISTRATOR')) return;
  
    if (oldMember.nickname !== newMember.nickname && oldMember.username !== undefined || null && newMember.username !== undefined || null) {
      const embed = new Discord.RichEmbed()
        .setAuthor(`${oldMember.user.tag} | Nickname change`, `${oldMember.user.displayAvatarURL}`)
        .setColor("#ffc500")
        .setDescription(`**<@${newMember.id}> changed their nickname** ${fire}`)
        .addField('Old nickname:', `**${oldMember.nickname}**`, true)
        .addField('New nickname:', `**${newMember.nickname}**`, true)
        .setFooter(`Member ID: ${newMember.id}`)
        .setTimestamp()
  
        await logchannel.send(embed).catch()
      }
  
    if (oldMember.username !== newMember.username) {
      const embed = new Discord.RichEmbed()
        .setAuthor(`${oldMember.user.tag} | Username change`, `${oldMember.user.displayAvatarURL}`)
        .setColor("#ffc500")
        .setDescription(`**<@${newMember.id}> changed their username** ${fire}`)
        .addField('Old username', `**${oldMember.username}**`, true)
        .addField('New username:', `**${newMember.username}**`, true)
        .setFooter(`Member ID: ${newMember.id}`)
        .setTimestamp()
  
        await logchannel.send(embed).catch()
      }
  
      if (oldMember.roles.size !== newMember.roles.size) {
          if (oldMember.roles.size > newMember.roles.size) {
            //Lost
            let dif = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first()
            const embed = new Discord.RichEmbed()
            .setAuthor(`${oldMember.user.tag} | Lost a role`, `${oldMember.user.displayAvatarURL}`)
            .setColor("#ffc500")
            .setDescription(`**<@${newMember.id}> has lost the ${dif.toString()} role** ${fire}`)
            .setFooter(`Member ID: ${newMember.id} • Role ID: ${dif.id} `)
            .setTimestamp()
            await logchannel.send(embed).catch()
  
        } else if (oldMember.roles.size < newMember.roles.size) {
            //Given
            let dif = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first()
            const embed2 = new Discord.RichEmbed()
            .setAuthor(`${oldMember.user.tag} | Gained a role`, `${oldMember.user.displayAvatarURL}`)
            .setColor("#ffc500")
            .setDescription(`**<@${newMember.id}> was given the ${dif.toString()} role** ${fire}`)
            .setFooter(`Member ID: ${newMember.id} • Role ID: ${dif.id}`)
            .setTimestamp()
            await logchannel.send(embed2).catch()
  
        }
      }
      
  });