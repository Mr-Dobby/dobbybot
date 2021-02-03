const Discord = require("discord.js");
const ms = require("ms");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.cache.get(logName.incidentLog)

  const Failure = bot.emojis.cache.get(require("../../storage/config.json").emojis.Failure); 
  const Success = bot.emojis.cache.get(require("../../storage/config.json").emojis.Success);

  var noPermsEmbed = new Discord.MessageEmbed()
      .setDescription(`${Failure} Locking a channel requires you to have \`MANAGE CHANNELS\` and \`MANAGE MESSAGES\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Locking a channel requires me to have \`MANAGE CHANNELS\` and \`MANAGE MESSAGES\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission(["MANAGE_CHANNELS" && "MANAGE_MESSAGES"])) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission(["MANAGE_CHANNELS" && "MANAGE_MESSAGES"])) {
    return message.channel.send(noPermsEmbed);
  }

    let lockdownErrorEmbed = new Discord.MessageEmbed()
    .setColor("#ff4f4f")
    .setTitle(`\`Command: ${currPrefix.prefix}lockdown\` | Alias: \`lock\``)
    .setDescription(`Valid unlocks: \`${currPrefix.prefix}lockdown [<${currPrefix.prefix}unlock> | <${currPrefix.prefix}release>]\``)
    .addField("**Description:**", "Disallows everyone from chatting in __this__ channel. Excluding Admins")
    .addField("**Command usage:**", `${currPrefix.prefix}lockdown <channel ID> <time> | ${currPrefix.prefix}lockdown <channel ID> ${currPrefix.prefix}unlock`)
    .addField("**Example:**",  `${currPrefix.prefix}lock 749029110558490654 2h | ${currPrefix.prefix}lockdown 749029110558490654 ${currPrefix.prefix}release`)
    .setFooter("<> = Required, [] = Optional")

  if (logchannel) {

if (!client.lockit) client.lockit = [];
let channel = bot.channels.cache.get(args[0])
if (!channel) { return message.channel.send(lockdownErrorEmbed) }
let time = args[1];
let validUnlocks = [`${currPrefix.prefix}release`, `${currPrefix.prefix}unlock`]

if (!time) return message.channel.send(lockdownErrorEmbed)

var muterole = currPrefix.muteRole;
var chatbanrole = currPrefix.chatbanRole;

if (validUnlocks.includes(time)) {
  if (chatbanrole && muterole) {
    channel.overwritePermissions([
      {
        id: muterole.id,
        deny: ['SEND_MESSAGES']
      },
      {
        id: chatbanrole.id,
        deny: ['VIEW_CHANNEL']
      },
      {
        id: message.guild.id,
        null: ['SEND_MESSAGES'],
      }
    ])
  } else {
  channel.overwritePermissions([
    {
      id: message.guild.id,
      null: ['SEND_MESSAGES'],
    }
  ])
}
          let liftedemb = new Discord.MessageEmbed()
              .setAuthor(`${message.author.tag} | Unlock`, message.author.displayAvatarURL({ dynamic: true }))
              .setDescription(`${Success} Lockdown lifted via the unlock command. Everyone can now chat again.\n(Locked channel: ${channel})`)
              .setColor("#7aff7a")
          channel.send(liftedemb)
          logchannel.send(liftedemb)
          clearTimeout(client.lockit[channel.id]);
          delete client.lockit[channel.id];

} else {

  if (chatbanrole && muterole) {
    channel.overwritePermissions([
      {
        id: muterole.id,
        deny: ['SEND_MESSAGES']
      },
      {
        id: chatbanrole.id,
        deny: ['VIEW_CHANNEL']
      },
      {
        id: message.guild.id,
        null: ['SEND_MESSAGES'],
      }
    ])
  } else {
      channel.overwritePermissions([
        {
          id: message.guild.id,
          deny: ['SEND_MESSAGES'],
        }
      ])
    }
    let successemb = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Lockdown`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Success} Channel Locked down for **${ms(ms(time), { long: true })}**. \n(Locked channel: ${channel})`)
        .setColor("#7aff7a")
          channel.send(successemb)
          logchannel.send(successemb)
              .then(() => {
                  client.lockit[channel.id] = setTimeout(() => {
                    channel.overwritePermissions([
                      {
                        id: message.guild.id,
                        null: ['SEND_MESSAGES'],
                      }
                    ])
                          let liftedemb2 = new Discord.MessageEmbed()
                              .setDescription(`${Success} Lockdown lifted via timeout. Everyone can now chat again.\n (Locked channel: ${channel})`)
                              .setColor("#7aff7a")
                              .setFooter(`Opened up again for everyone ❤️`, message.guild.iconURL({ dynamic: true }))
                              .setTimestamp()
                        channel.send(liftedemb2)
                        logchannel.send(liftedemb2)
                          .catch(console.error);
                      delete client.lockit[channel.id];
                  }, ms(time));
                })
              }

    } else {

if (!client.lockit) client.lockit = [];
let time = args[0];
let validUnlocks = ['-release', '-unlock']

if (!time) return channel.send(lockdownErrorEmbed)

if (validUnlocks.includes(time)) {

  if (chatbanrole && muterole) {
    channel.overwritePermissions([
      {
        id: muterole.id,
        deny: ['SEND_MESSAGES']
      },
      {
        id: chatbanrole.id,
        deny: ['VIEW_CHANNEL']
      },
      {
        id: message.guild.id,
        null: ['SEND_MESSAGES'],
      }
    ])
  } else {
  channel.overwritePermissions([
    {
      id: message.guild.id,
      null: ['SEND_MESSAGES'],
    }
  ])
}

          let liftedemb = new Discord.MessageEmbed()
              .setAuthor(`${message.author.tag} | Unlock`, message.author.displayAvatarURL({ dynamic: true }))
              .setDescription(`Lockdown lifted via the unlock command. Everyone can now chat again. \n(Locked channel: ${channel})`)
              .setColor("#7aff7a")
          channel.send(liftedemb)
          clearTimeout(client.lockit[channel.id]);
          delete client.lockit[channel.id];

} else {

  if (chatbanrole && muterole) {
    channel.overwritePermissions([
      {
        id: muterole.id,
        deny: ['SEND_MESSAGES']
      },
      {
        id: chatbanrole.id,
        deny: ['VIEW_CHANNEL']
      },
      {
        id: message.guild.id,
        null: ['SEND_MESSAGES'],
      }
    ])
  } else {
      channel.overwritePermissions([
        {
          id: message.guild.id,
          deny: ['SEND_MESSAGES'],
        }
      ])
    }
    let successemb = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Lockdown`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Channel Locked down for **${ms(ms(time), { long: true })}**. \n(Locked channel: ${channel})`)
        .setColor("#7aff7a")
          channel.send(successemb)
              .then(() => {
                  client.lockit[channel.id] = setTimeout(() => {
                    channel.overwritePermissions([
                      {
                        id: message.guild.id,
                        null: ['SEND_MESSAGES'],
                      }
                    ])
                          let liftedemb2 = new Discord.MessageEmbed()
                              .setDescription(`Lockdown lifted via timeout. Everyone can now chat again.\n (Locked channel: ${channel})`)
                              .setColor("#7aff7a")
                              .setFooter(`Opened up again for everyone ❤️`, message.guild.iconURL({ dynamic: true }))
                              .setTimestamp()
                        channel.send(liftedemb2)
                        logchannel.send(liftedemb2)
                          .catch(console.error);
                      delete client.lockit[channel];
                  }, ms(time));
              }).catch(error => {
                  console.log(error);
              });
          }
      }
}

module.exports.help = {
  name: "lockdown",
  aliases: ["lock"]
}
