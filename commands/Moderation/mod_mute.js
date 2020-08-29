const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const ms = require("ms");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.cache.get(logName.incidentLog)

  const Failure = bot.emojis.cache.get("697388354689433611");
  const Sucess = bot.emojis.cache.get("697388354668462110");

  var noPermsEmbed = new Discord.MessageEmbed()
      .setDescription(`${Failure} Muting a member requires you to have \`MANAGE MESSAGE\` and \`MUTE MEMBERS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Muting a member requires me to have \`MANAGE MESSAGE\` and \`MANAGE ROLES\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission(["MUTE_MEMBERS" && "MANAGE_ROLES_OR_PERMISSIONS"])) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission(["MUTE_MEMBERS" && "MANAGE_MESSAGES"])) {
    return message.channel.send(noPermsEmbed);
  }

  if (!logchannel) {

    let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.cache.get(args[0]));

    let ThonkRolly = bot.emojis.cache.get("697218428427042886")
    let TREmbed = new Discord.MessageEmbed()
        .setColor("#ff4f4f")
        .setAuthor(`${member.user.tag} | Mute`, member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`<@${message.author.id}> Task Failed Successfully..... wait ${ThonkRolly}`)

    if (member.id === "441478072559075328") {
      return message.channel.send(TREmbed)
    }

  const mutePermErrorModEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor("PERMISSION ERROR")
        .setTitle(":x: **User is a Mod** :x:")

  const AlreadyMutedEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor(`${member.user.tag} | Mute`, member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`${member} is already muted`)

  const mutePermErrorAdminEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor("PERMISSION ERROR")
        .setTitle(":x: **User is an Admin** :x:")

  const mutePermErrorOwnerEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor("PERMISSION ERROR")
        .setTitle(":x: **You can't mute the owner** :x:")

  const muteErrorEmbed = new Discord.MessageEmbed()
        .setColor("#ff4f4f")
        .setTitle(`\`Command: ${currPrefix.prefix}mute\` | Alias: \`stfu\``)
        .addField("**Description:**", "Mute a user. Deny them from text chatting & voice talking.")
        .addField("**Command usage:**", `${currPrefix.prefix}mute <@User> [Time] [Reason]`)
        .addField("**Example:**", `${currPrefix.prefix}mute @Mr.Dobby#0001 1m Spam`)
        .setFooter("Default mute time: 30 min. | <> = Required, [] = Optional")

  if (!member) return message.channel.send(muteErrorEmbed);

  if (member === message.guild.me) {
    return message.channel.send("Not gonna mute myself with this command, fella.")
  }

  if (member.id === message.author.id) {
    return message.channel.send("Imagine trying to mute yourself.. ")
  }
/*
  if (member.highestRole.position >= message.member.highestRole.position) {
    return message.channel.send('You cannot mute a member who is higher or has the same role as you!');
  }
*/
  if (member === message.guild.owner) return message.channel.send(mutePermErrorOwnerEmbed);
  if (member.hasPermission("ADMINISTRATOR")) return message.channel.send(mutePermErrorAdminEmbed);
  if (member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_ROLES_OR_PERMISSIONS", "MANAGE_CHANNELS", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS"])) return message.channel.send(mutePermErrorModEmbed);

  let reason = args.slice(2).join(" ");
  if (!reason) reason = "No reason given."

  let muterole = message.guild.roles.cache.find(role => role.name === "🔇 Muted")
  if (member.roles.cache.has(muterole.id)) return message.channel.send(AlreadyMutedEmbed)
  //start of create role
  if (!muterole) {
    try {
      muterole = await message.guild.roles.create({
        data: {
          name: "🔇 Muted",
          color: "#525252",
          permissions:[]
        }
      })
      message.guild.channels.cache.forEach(async (channel) => {
        await channel.overwritePermissions([
          {
            id: muterole.id,
            deny: ['SEND_MESSAGES',
            'ADD_REACTIONS',
            'SPEAK'],
          }
        ])
      });
    } catch(e) {
      console.log(e.stack);
    }
  }

  let mutetime = args[1];
  if (!mutetime) mutetime = "30m";
  if (mutetime === '1y') return message.channel.send("Muting someone for this long is a lil harsh isn't it? Try with something lower. This **is** a year of no communication, might as well ban them.");

      let muteembed = new Discord.MessageEmbed()
          .setColor("#7aff7a")
          .setAuthor('Successfully muted!', member.user.displayAvatarURL({ dynamic: true }))
          .setDescription(`<@${member.user.id}> has been muted`)

      let Embed2Member = new Discord.MessageEmbed()
          .setColor("#ff4f4f")
          .setDescription(`Muted in ${message.guild}\n\nLength: ${ms(ms(mutetime), { long: true })}\nReason: ${reason}`)

await (member.roles.add(muterole.id));
if (member.channels.voice) {
  member.setMute(true);
}
      
try {
  await member.send(Embed2Member);
    } catch(e) {
      return;
}

let DidYouKnow = new Discord.MessageEmbed()
.setDescription(`Did you know you can log these actions?\nTry out \`${currPrefix.prefix}logging\``)

message.delete();
message.channel.send(muteembed).catch(error => console.log(error))
message.channel.send(DidYouKnow).then(m => m.delete({ timeout: 10000 }))

//Keep Muted role until time = 0
  setTimeout(function() {
    if (!member.roles.cache.has(muterole.id)) return;
    member.roles.remove(muterole.id);
    if (member.voiceChannel) {
      member.setMute(false);
    }

    Embed2Member.setColor("#7aff7a")
    Embed2Member.setDescription(`Unmuted in ${message.guild}`)
    Embed2Member.setFooter("Unmute due to: Timeout. | Please be sure to follow the rules.")

try {

    member.send(Embed2Member)
  } catch(e) {
    message.channel.send("Someone still has their DMs blocked. . .\nWell they're unmuted now.")
    }
  }, ms(mutetime));

    } else {

            const mutePermErrorModEmbed = new Discord.MessageEmbed()
                  .setColor("#ff0000")
                  .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL({ dynamic: true }))
                  .setDescription(`${Failure} Member is a Moderator.`)
        
            const mutePermErrorAdminEmbed = new Discord.MessageEmbed()
                  .setColor("#ff0000")
                  .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL({ dynamic: true }))
                  .setDescription(`${Failure} Member is an Administrator.`)
        
            const mutePermErrorOwnerEmbed = new Discord.MessageEmbed()
                  .setColor("#ff0000")
                  .setAuthor(`${message.author.tag} | Stupidity Error`, message.author.displayAvatarURL({ dynamic: true }))
                  .setDescription(`${Failure} This is the server owner, nice try tho.`)

            const muteErrorEmbed = new Discord.MessageEmbed()
                  .setColor("#ff4f4f")
                  .setTitle(`\`Command: ${currPrefix.prefix}mute\` | Alias: \`stfu\``)
                  .addField("**Description:**", "Mute a user. Deny them from text chatting & voice talking.")
                  .addField("**Command usage:**", `${currPrefix.prefix}mute <@User> [Time] [Reason]`)
                  .addField("**Example:**", `${currPrefix.prefix}mute @Mr.Dobby#0001 1m Spam`)
                  .setFooter("Default mute time: 30 min. | <> = Required, [] = Optional")          

    let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!member) return message.channel.send(muteErrorEmbed)

    let ThonkRolly = bot.emojis.cache.get("697218428427042886")
    let TREmbed = new Discord.MessageEmbed()
        .setColor("#ff4f4f")
        .setAuthor(`${message.author.tag} | Mute`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`<@${message.author.id}> Task Failed Successfully..... wait ${ThonkRolly}`)
  
    if (member.id === "441478072559075328") {
      return message.channel.send(TREmbed)
    }
  
    if (member === message.guild.owner) return message.channel.send(mutePermErrorOwnerEmbed);
    if (member.hasPermission("ADMINISTRATOR")) return message.channel.send(mutePermErrorAdminEmbed);
    if (member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_ROLES_OR_PERMISSIONS", "MANAGE_CHANNELS", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS"])) return message.channel.send(mutePermErrorModEmbed);

  const AlreadyMutedEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${member.user.tag} | Mute`, member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} ${member} is already muted`)

      let muterole = message.guild.roles.cache.find(role => role.name === "🔇 Muted")
      if (member.roles.cache.has(muterole)) return message.channel.send(AlreadyMutedEmbed)
      //start of create role
      if (!muterole) {
        try {
          muterole = await message.guild.roles.create({
            data: {
              name: "🔇 Muted",
              color: "#525252",
              permissions:[]
            }
          })
          message.guild.channels.cache.forEach(async (channel) => {
            await channel.overwritePermissions([
              {
                id: muterole.id,
                deny: ['SEND_MESSAGES',
                'ADD_REACTIONS',
                'SPEAK'],
              }
            ])
          });
        } catch(e) {
          console.log(e.stack);
        }
      }

  if (member === message.guild.me) {
    return message.channel.send("Not gonna mute myself with this command, fella.")
  }

  if (member.id === message.author.id) {
    return message.channel.send("Imagine trying to mute yourself.. ")
  }
/*
  if (member.highestRole.position >= message.member.highestRole.position) {
    return message.channel.send('You cannot mute a member who is higher or has the same role as you!');
  }
*/
  let reason = args.slice(2).join(" ");
  if (!reason) reason = "No reason given."

  //mute time
  let mutetime = args[1];
  if (!mutetime) mutetime = "30m";
  if (mutetime === '1y') return message.channel.send("Muting someone for this long is a lil harsh isn't it? Try with something lower. This **is** a year of no communication, might as well ban them.");

await (member.roles.add(muterole.id));
if (member.channels.voice) {
  member.setMute(true);
}

let muteembedLog = new Discord.MessageEmbed()
    .setAuthor(`${member.user.tag} | Mute`, member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`\`${currPrefix.prefix}mute <@User> [Time] [Reason]\``)
    .setColor("#ff4f4f")
    .addField("User", `<@${member.id}>`, true)
    .addField("Moderator", `<@${message.author.id}>`, true)
    .addField("Length", `${ms(ms(mutetime), { long: true })}`, true)
    .addField("Reason", `${reason}`, true)
    .setFooter(`ID: ${member.id}`)
    .setTimestamp()

let unmuteembedLog = new Discord.MessageEmbed()
    .setAuthor(`${member.user.tag} | Unmute`, member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`<@${member.user.id}> has been unmuted`)
    .setColor("#7aff7a")
    .addField("Mute time:", `${ms(ms(mutetime), { long: true })}`, true)
    .addField("Unmute reason:", `Auto timeout, unmuted due to mute time expired.`, true)
    .setFooter(`ID: ${member.user.id}`)
    .setTimestamp()

let Embed2Member = new Discord.MessageEmbed()
    .setColor("#ff4f4f")
    .setAuthor(`Muted in ${message.guild}.`, member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`\n\nLength: ${ms(ms(mutetime), { long: true })}\nReason: ${reason}`)
    .setTimestamp()

try {
  await member.send(Embed2Member);
  } catch(e) {
  message.channel.send("Someone has their DMs blocked. . . & they're muted.")
}

let muteembed = new Discord.MessageEmbed()
.setColor("#7aff7a")
.setAuthor('Successfully muted!', member.user.displayAvatarURL({ dynamic: true }))
.setDescription(`${Sucess} <@${member.user.id}> has been muted`)

message.delete();
message.channel.send(muteembed).catch(error => console.log(error))
logchannel.send(muteembedLog).catch(error => console.log(error))

//Keep Muted role until time = 0
setTimeout(function() {
  if (!member.roles.cache.has(muterole.id)) return;
    member.roles.remove(muterole.id);
      if (member.voiceChannel) {
        member.setMute(false);
  }

    logchannel.send(unmuteembedLog)
    Embed2Member.setColor("#7aff7a")
    Embed2Member.setDescription(`Unmuted in ${message.guild}`)
    Embed2Member.setFooter("Unmute due to: Timeout. | Please be sure to follow the rules.")

try {
    member.send(Embed2Member)
      } catch(e) {
        return;
      }
    }, ms(mutetime));
  }

}

module.exports.help = {
  name: "mute",
  aliases: ["stfu"]
}
