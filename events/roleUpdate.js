const Discord = require("discord.js");
const {bot} = require('../index');
const Logs = require('../lib/logs');
const colour = require('../storage/colours.json')

bot.on("roleUpdate", async (oldRole, newRole) => {

  var date = new Date();
  var hs = String(date.getHours()).padStart(2, '0');
  var min = String(date.getMinutes()).padStart(2, '0');
  var sec = String(date.getSeconds()).padStart(2, '0');

    let fire = bot.emojis.cache.get("687436596391182344")
    let logName = await Logs.findOne( { guildID: oldRole.guild.id } )
    const logchannel = bot.channels.cache.get(logName.serverLog)
    if (!logchannel) return;
    if (!logchannel.permissionsFor(oldRole.guild.me).has('VIEW_CHANNEL')) return;
    if (!logchannel.permissionsFor(oldRole.guild.me).has('SEND_MESSAGES')) return;
    if (!logchannel.permissionsFor(oldRole.guild.me).has('EMBED_LINKS')) return;
    
    const status = {
        false: "Disabled/No",
        true: "Enabled/Yes"
      }

    if (oldRole.name !== newRole.name) {
  
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${newRole.guild.name} | Role update`, newRole.guild.iconURL({ dynamic: true }))
    .setColor(colour.roles)
    .setDescription(`**${oldRole.toString()}** updated name ${fire}`)
    .addField('Old name', `${oldRole.name}`, true)
    .addField('New name', `__**${newRole.name}**__`, true)
    .setFooter(`Role ID: ${newRole.id} • ${hs}:${min}:${sec}`)
  
    await logchannel.send(embed).catch()
  
  }
  
    if (oldRole.rawPosition !== newRole.rawPosition ) {
  
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${newRole.guild.name} | Role update`, newRole.guild.iconURL({ dynamic: true }))
    .setColor(colour.roles)
    .setDescription(`**${oldRole.toString()}** updated position ${fire}`)
    .addField('Old position', `${oldRole.guild.roles.cache.size - oldRole.rawPosition} out of ${oldRole.guild.roles.cache.size}`, true)
    .addField('New position', `__**${newRole.guild.roles.cache.size - newRole.rawPosition} out of ${newRole.guild.roles.cache.size}**__`, true)
    .setFooter(`Role ID: ${newRole.id} • ${hs}:${min}:${sec}`)
  
    await logchannel.send(embed).catch()
  
  }
  
    if (oldRole.hexColor !== newRole.hexColor) {
  
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${newRole.guild.name} | Role update`, newRole.guild.iconURL({ dynamic: true }))
    .setColor(newRole.hexColor)
    .setDescription(`**${oldRole.toString()}** updated colour ${fire}`)
    .addField('Old colour', `${oldRole.hexColor}`, true)
    .addField('New colour', `__**${newRole.hexColor}**__`, true)
    .setFooter(`Role ID: ${newRole.id} • ${hs}:${min}:${sec}`)
  
    await logchannel.send(embed).catch()
  
  }
  
    if (oldRole.hoist !== newRole.hoist) {
  
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${newRole.guild.name} | Role update`, newRole.guild.iconURL({ dynamic: true }))
    .setColor(colour.roles)
    .setDescription(`**${oldRole.toString()}** updated general settings ${fire}`)
    .addField(`Seperated from other roles`, `${status[newRole.hoist]}`, true)
    .setFooter(`Role ID: ${newRole.id} • ${hs}:${min}:${sec}`)

    await logchannel.send(embed).catch()
  
  }

    if (oldRole.mentionable !== newRole.mentionable) {

      const embed = new Discord.MessageEmbed()
      .setAuthor(`${newRole.guild.name} | Role update`, newRole.guild.iconURL({ dynamic: true }))
      .setColor(colour.roles)
      .setDescription(`**${oldRole.toString()}** updated general settings ${fire}`)
      .addField(`Mentionable by everyone`, `${status[newRole.mentionable]}`, true)
      .setFooter(`Role ID: ${newRole.id} • ${hs}:${min}:${sec}`)
    
      await logchannel.send(embed).catch()

  }
  
    if (oldRole.permissions !== newRole.permissions) {
  
      const embed = new Discord.MessageEmbed()
      .setAuthor(`${newRole.guild.name} | Role update`, newRole.guild.iconURL({ dynamic: true }))
      .setColor(colour.roles)
      .setFooter(`Role ID: ${newRole.id} • ${hs}:${min}:${sec}`)
  
      const oldPerms = oldRole.permissions.serialize();
      const newPerms = newRole.permissions.serialize();
  
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