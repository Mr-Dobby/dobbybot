const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');

bot.on("roleUpdate", async (oldRole, newRole) => {

    let fire = bot.emojis.get("687436596391182344")
    let logName = await Logs.findOne( { guildID: oldRole.guild.id } )
    const logchannel = bot.channels.get(logName.serverLog)
    if (!logchannel) return;
    if (!logchannel.permissionsFor(oldRole.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(oldRole.guild.me).has('ADMINISTRATOR')) return;

    const status = {
        false: "Disabled",
        true: "Enabled"
      }
  
    const hexColor = newRole.hexColor;
  
      //if nothing changed
    if (oldRole == newRole) return;
      //leave @everyone alone
    if (oldRole.id == oldRole.guild.id || newRole.id == newRole.guild.id) return;
  
    if (oldRole.name !== newRole.name) {
  
    const embed = new Discord.RichEmbed()
    .setAuthor(`${newRole.guild.name} | Role update`, newRole.guild.iconURL)
    .setColor("#ffc500")
    .setDescription(`**${oldRole.toString()}** updated name ${fire}`)
    .addField('Old name:', `${oldRole.name}`, true)
    .addField('New new:', `__**${newRole.name}**__`, true)
    .setFooter(`Role ID: ${newRole.id}`)
    .setTimestamp()
  
    await logchannel.send(embed).catch()
  
  }
  
    if (oldRole.position !== newRole.position) {
  
    const embed = new Discord.RichEmbed()
    .setAuthor(`${newRole.guild.name} | Role update`, newRole.guild.iconURL)
    .setColor("#ffc500")
    .setDescription(`**${oldRole.toString()}** updated position ${fire}`)
    .addField('Old position:', `${oldRole.guild.roles.size - oldRole.position} out of ${oldRole.guild.roles.size}`, true)
    .addField('New position:', `__**${newRole.guild.roles.size - newRole.position} out of ${newRole.guild.roles.size}**__`, true)
    .setFooter(`Role ID: ${newRole.id}`)
    .setTimestamp()
  
    await logchannel.send(embed).catch()
  
  }
  
    if (oldRole.hexColor !== newRole.hexColor) {
  
    const embed = new Discord.RichEmbed()
    .setAuthor(`${newRole.guild.name} | Role update`, newRole.guild.iconURL)
    .setColor(hexColor)
    .setDescription(`**${oldRole.toString()}** updated colour ${fire}`)
    .addField('Old colour:', `${oldRole.hexColor}`, true)
    .addField('New colour:', `__**${newRole.hexColor}**__`, true)
    .setFooter(`Role ID: ${newRole.id}`)
    .setTimestamp()
  
    await logchannel.send(embed).catch()
  
  }
  
    if (oldRole.hoist !== newRole.hoist || oldRole.mentionable !== newRole.mentionable) {
  
    const embed = new Discord.RichEmbed()
    .setAuthor(`${newRole.guild.name} | Role update`, newRole.guild.iconURL)
    .setColor("#ffc500")
    .setDescription(`**${oldRole.toString()}** updated general settings ${fire}`)
    .addField('Old Hoisted:', `${status[oldRole.hoist]}`, true)
    .addBlankField(true)
    .addField('New Hoisted:', `__**${status[newRole.hoist]}**__`, true)
    .addField('Old Mentionable:', `${status[oldRole.mentionable]}`, true)
    .addBlankField(true)
    .addField('New Mentionable:', `__**${status[newRole.mentionable]}**__`, true)
    .setFooter(`Role ID: ${newRole.id}`)
    .setTimestamp()
  
    await logchannel.send(embed).catch()
  
  }
  
    if (oldRole.permissions !== newRole.permissions) {
  
      const embed = new Discord.RichEmbed()
      .setAuthor(`${newRole.guild.name} | Role update`, newRole.guild.iconURL)
      .setColor("#ffc500")
      .setFooter(`Role ID: ${newRole.id}`)
      .setTimestamp()
  
      const oldPerms = oldRole.serialize();
      const newPerms = newRole.serialize();
  
      const permUpdated = [];
  
      for (const [key, element] of Object.entries(oldPerms)) {
          if (newPerms[key] !== element) permUpdated.push(key);
      }
  
      if (oldRole.permissions > newRole.permissions) {
        //Permission**s** lost
        if (oldRole.permissions > newRole.permissions <= 2) {
          embed.setDescription(`**${newRole.toString()} has been denied the** \`${permUpdated.join(", ")}\` **permissions** ${fire}`)
          await logchannel.send(embed).catch()
        } else {
          //Permission lost
          embed.setDescription(`**${newRole.toString()} has been denied the** \`${permUpdated.join(", ")}\` **permission** ${fire}`)
          await logchannel.send(embed).catch()
        }
      } else if (oldRole.permissions < newRole.permissions) {
        //Permissio**s** gained
        if (oldRole.permissions < newRole.permissions <= 2) {
          embed.setDescription(`**${newRole.toString()} has been granted the** \`${permUpdated.join(", ")}\` **permissions** ${fire}`)
          await logchannel.send(embed).catch()
        } else {
          //Permission gained
          embed.setDescription(`**${newRole.toString()} has been granted the** \`${permUpdated.join(", ")}\` **permission** ${fire}`)
          await logchannel.send(embed).catch()
        }
      }
    }
   
  });