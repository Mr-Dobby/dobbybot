const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');

bot.on("guildMemberUpdate", async (oldMember, newMember) => {

    let fire = bot.emojis.cache.get("687436596391182344")
    let logName = await Logs.findOne( { guildID: oldMember.guild.id } )
    if (!logName) return;
    const logchannel = bot.channels.cache.get(logName.serverLog)
    if (!logchannel) return;
    if (!logchannel.permissionsFor(oldMember.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(oldMember.guild.me).has('ADMINISTRATOR')) return;

    if (oldMember.user.tag !== newMember.user.tag) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${oldMember.user.tag} | User tag change`, `${oldMember.user.displayAvatarURL({ dynamic: true })}`)
        .setColor("#ffc500")
        .setDescription(`**<@${newMember.id}> changed their user tag** ${fire}`)
        .addField('Old nickname:', `**${oldMember.user.tag}**`, true)
        .addField('New nickname:', `**${newMember.user.tag}**`, true)
        .setFooter(`Member ID: ${newMember.id}`)
        .setTimestamp()
  
        await logchannel.send(embed).catch()
      }
  
    if (oldMember.displayName !== newMember.displayName) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${oldMember.user.tag} | Username change`, `${oldMember.user.displayAvatarURL({ dynamic: true })}`)
        .setColor("#ffc500")
        .setDescription(`**<@${newMember.id}> changed their username** ${fire}`)
        .addField('Old username', `**${oldMember.displayName}**`, true)
        .addField('New username:', `**${newMember.displayName}**`, true)
        .setFooter(`Member ID: ${newMember.id}`)
        .setTimestamp()
  
        await logchannel.send(embed).catch()
      }
  
      if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
          if (oldMember.roles.cache.size > newMember.roles.cache.size) {
            //Lost
            let dif = oldMember.roles.cache.filter(r => !newMember.roles.cache.has(r.id)).first()
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${oldMember.user.tag} | Lost a role`, `${oldMember.user.displayAvatarURL({ dynamic: true })}`)
            .setColor("#ffc500")
            .setDescription(`**<@${newMember.id}> has lost the ${dif.toString()} role** ${fire}`)
            .setFooter(`Member ID: ${newMember.id} • Role ID: ${dif.id} `)
            .setTimestamp()
            await logchannel.send(embed).catch()
  
        } else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
            //Given
            let dif = newMember.roles.cache.filter(r => !oldMember.roles.cache.has(r.id)).first()
            const embed2 = new Discord.MessageEmbed()
            .setAuthor(`${oldMember.user.tag} | Gained a role`, `${oldMember.user.displayAvatarURL({ dynamic: true })}`)
            .setColor("#ffc500")
            .setDescription(`**<@${newMember.id}> was given the ${dif.toString()} role** ${fire}`)
            .setFooter(`Member ID: ${newMember.id} • Role ID: ${dif.id}`)
            .setTimestamp()
            await logchannel.send(embed2).catch()
  
        }
      }
      
  });