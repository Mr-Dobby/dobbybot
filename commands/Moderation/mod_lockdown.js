const Discord = require("discord.js");
const ms = require("ms");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.cache.get(logName.incidentLog)

  const Failure = bot.emojis.cache.get("697388354689433611");
  const Sucess = bot.emojis.cache.get("697388354668462110");

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
    .addField("**Command usage:**", `${currPrefix.prefix}lockdown <time> | ${currPrefix.prefix}lockdown ${currPrefix.prefix}unlock`)
    .addField("**Example:**",  `${currPrefix.prefix}lock 2h | ${currPrefix.prefix}lockdown ${currPrefix.prefix}release`)
    .setFooter("<> = Required, [] = Optional")
    
    if (!message.member.hasPermission(["MANAGE_CHANNELS" || "MANAGE_MESSAGES"])) {
        return message.channel.send("You need the `MANAGE MESSAGES` or `MANAGE CHANNELS` permissions.");
    }

  if (logchannel) {

if (!client.lockit) client.lockit = [];
let time = args[0];
let validUnlocks = [`${currPrefix.prefix}release`, `${currPrefix.prefix}unlock`]

if (!time) return message.channel.send(lockdownErrorEmbed)

if (validUnlocks.includes(time)) {

  message.channel.overwritePermissions([
    {
      id: message.guild.id,
      null: ['SEND_MESSAGES'],
    }
  ]).then(() => {
          let liftedemb = new Discord.MessageEmbed()
              .setAuthor(`${message.author.tag} | Unlock`, message.author.displayAvatarURL({ dynamic: true }))
              .setDescription(`${Sucess} Lockdown lifted via the unlock command. Everyone can now chat again.\n(Locked channel: <#${message.channel.id}>)`)
              .setColor("#7aff7a")
          message.channel.send(liftedemb)
          logchannel.send(liftedemb)
          clearTimeout(client.lockit[message.channel.id]);
          delete client.lockit[message.channel.id];
      })
      .catch(error => {
          console.log(error);
      });
} else {
      message.channel.overwritePermissions([
        {
          id: message.guild.id,
          deny: ['SEND_MESSAGES'],
        }
      ]).then(() => {
    let successemb = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Lockdown`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} Channel Locked down for **${ms(ms(time), { long: true })}**. \n(Locked channel: <#${message.channel.id}>)`)
        .setColor("#7aff7a")
          message.channel.send(successemb)
          logchannel.send(successemb)
              .then(() => {
                  client.lockit[message.channel.id] = setTimeout(() => {
                      message.channel.overwritePermissions(message.guild.id, {
                              SEND_MESSAGES: null
                          })
                          let liftedemb2 = new Discord.MessageEmbed()
                              .setDescription(`${Sucess} Lockdown lifted via timeout. Everyone can now chat again.\n (Locked channel: <#${message.channel.id}>)`)
                              .setColor("#7aff7a")
                              .setTimestamp()
                        message.channel.send(liftedemb2)
                        logchannel.send(liftedemb2)
                          .catch(console.error);
                      delete client.lockit[message.channel.id];
                  }, ms(time));
              })
              .catch(error => {
                  console.log(error);
              });
          });
        }

    } else {

if (!client.lockit) client.lockit = [];
let time = args[0];
let validUnlocks = ['-release', '-unlock']

if (!time) return message.channel.send(lockdownErrorEmbed)

if (validUnlocks.includes(time)) {

  message.channel.overwritePermissions([
    {
      id: message.guild.id,
      null: ['SEND_MESSAGES'],
    }
  ]).then(() => {

          let liftedemb = new Discord.MessageEmbed()
              .setAuthor(`${message.author.tag} | Unlock`, message.author.displayAvatarURL({ dynamic: true }))
              .setDescription(`Lockdown lifted via the unlock command. Everyone can now chat again. \n(Locked channel: <#${message.channel.id}>)`)
              .setColor("#7aff7a")
          message.channel.send(liftedemb)
          clearTimeout(client.lockit[message.channel.id]);
          delete client.lockit[message.channel.id];
      }).catch(error => {
          console.log(error);
      });

} else {

      message.channel.overwritePermissions([
        {
          id: message.guild.id,
          deny: ['SEND_MESSAGES'],
        }
      ]).then(() => {
    let successemb = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} | Lockdown`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Channel Locked down for **${ms(ms(time), { long: true })}**. \n(Locked channel: <#${message.channel.id}>)`)
        .setColor("#7aff7a")
          message.channel.send(successemb)
              .then(() => {
                  client.lockit[message.channel.id] = setTimeout(() => {
                      message.channel.overwritePermissions(message.guild.id, {
                              SEND_MESSAGES: null
                            })
                          let liftedemb2 = new Discord.MessageEmbed()
                              .setDescription(`Lockdown lifted via timeout. Everyone can now chat again.\n (Locked channel: <#${message.channel.id}>)`)
                              .setColor("#7aff7a")
                              .setTimestamp()
                        message.channel.send(liftedemb2)
                        logchannel.send(liftedemb2)
                          .catch(console.error);
                      delete client.lockit[message.channel.id];
                  }, ms(time));
              }).catch(error => {
                  console.log(error);
              });
          });
        }
    }
}

module.exports.help = {
  name: "lockdown",
  aliases: ["lock"]
}
