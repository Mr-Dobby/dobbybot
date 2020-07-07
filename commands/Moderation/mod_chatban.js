const Discord = require("discord.js");
const ms = require("ms");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.get(logName.incidentLog)

  const Failure = bot.emojis.get("697388354689433611");
  const Sucess = bot.emojis.get("697388354668462110");

  var noPermsEmbed = new Discord.RichEmbed()
      .setDescription(`${Failure} Chatbanning members requires you to have \`MANAGE MESSAGES\` and \`MUTE MEMBERS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.RichEmbed()
      .setDescription(`${Failure} Chatbanning members requires me to have \`ADMINISTRATOR\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission(["MANAGE_MESSAGES" && "MUTE_MEMBERS"])) {
    return message.channel.send(noPermsEmbed);
  }

  if (logchannel) {

    const chatbanPermErrorModEmbed = new Discord.RichEmbed()
          .setColor("#ff0000")
          .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL)
          .setDescription(`${Failure} Member is a Moderator.`)

    const chatbanPermErrorAdminEmbed = new Discord.RichEmbed()
          .setColor("#ff0000")
          .setAuthor(`${message.author.tag} | Permission Error`)
          .setDescription(`${Failure} Member is an Administrator.`, message.author.displayAvatarURL)

    const chatbanPermErrorOwnerEmbed = new Discord.RichEmbed()
          .setColor("#ff0000")
          .setAuthor(`${message.author.tag} | Stupidity Error`, message.author.displayAvatarURL)
          .setDescription(`${Failure} This is the server owner, nice try tho.`)

    const chatbanErrorEmbed = new Discord.RichEmbed()
          .setColor("#ff4f4f")
          .setTitle(`\`Command: ${currPrefix.prefix}chatban\``)
          .addField("**Description:**", "Chatban a user. Deny them from viewing __**any**__ channels.")
          .addField("**Command usage:**", `${currPrefix.prefix}chatban <@User> [Time] [Reason]`)
          .addField("**Example:**", `${currPrefix.prefix}chatban @Mr.Dobby#0001 1m Spam`)
          .setFooter("Default chatban time: 60 min. | <> = Required, [] = Optional")

  let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!member) return message.channel.send(chatbanErrorEmbed);

  if (member === message.guild.me) {
    return message.channel.send("Not gonna chatban myself with this command, fella.")
  }

  if (member.highestRole.position >= message.member.highestRole.position) {
    return message.channel.send('You cannot chatban a member who is higher or has the same role as you!');
  }

  if (member === message.guild.owner) return message.channel.send(chatbanPermErrorOwnerEmbed);
  if (member.hasPermission("ADMINISTRATOR")) return message.channel.send(chatbanPermErrorAdminEmbed);
  if (member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_ROLES_OR_PERMISSIONS", "MANAGE_CHANNELS", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS"])) return message.channel.send(chatbanPermErrorModEmbed);

  if (member.id === message.author.id) {
    return message.channel.send("Imagine trying to chatban yourself.. ")
  }

  let reason = args.slice(2).join(" ");
  if (!reason) reason = "No reason given. Savage."

  const AlreadyChatbannedEmbed = new Discord.RichEmbed()
  .setColor("#ff0000")
  .setAuthor(`${member.user.tag} | Chatban`, member.user.displayAvatarURL)
  .setDescription(`${Failure} ${member} is already chatbanned`)

  let chatbanrole = message.guild.roles.find(role => role.name === "⛔ Chatbanned")
  if (member.roles.has(chatbanrole.id)) return message.channel.send(AlreadyChatbannedEmbed)
  //start of create role
  if (!chatbanrole) {
    try {
      chatbanrole = await message.guild.createRole({
        name: "⛔ Chatbanned",
        color: "#1b1b1b",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel) => {
        await channel.overwritePermissions(chatbanrole, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            READ_MESSAGE_HISTORY: false,
            SPEAK: false
        });
      });
    } catch(e) {
      console.log(e.stack);
    }
  }

  //end of create role

  //chatban time
  let chatbantime = args[1];
  if (!chatbantime) chatbantime = "60m";
  if (chatbantime === '1y') return message.channel.send("Chatbanning someone for this long is a lil harsh isn't it? Try with something lower. This **is** a year of no communication, might as well ban them.");

      const chatbanembed = new Discord.RichEmbed()
            .setColor("#7aff7a")
            .setAuthor('Successfully chatbanned!', member.user.avatarURL)
            .setDescription(`${Sucess} <@${member.user.id}> has been chatbanned`)

      const chatbanembedLog = new Discord.RichEmbed()
            .setAuthor(`${member.user.tag} | Chatban ⛔`, member.user.displayAvatarURL)
            .setDescription(`\`${currPrefix.prefix}chatban <@User> [Time] [Reason]\``)
            .setColor("#ff4f4f")
            .addField("User:", `${member.user.tag}\n<@${member.user.id}>`, true)
            .addField("Moderator", `${message.author.tag}\n<@${message.author.id}>`, true)
            .addField("Length", `${ms(ms(chatbantime), { long: true })}`, true)
            .addField("Reason", `${reason}`, false)
            .setFooter(`ID: ${member.user.id} | Default chatban time: 60 min.`)
            .setTimestamp()

      const unchatbanembedLog = new Discord.RichEmbed()
            .setAuthor(`${member.user.tag} | Unchatban 🔉`, member.user.displayAvatarURL)
            .setDescription(`<@${member.user.id}> has been unchatbanned`)
            .setColor("#7aff7a")
            .addField("Chatban time:", `${ms(ms(chatbantime), { long: true })}`, true)
            .addField("Unchatban reason:", `Auto timeout, unmuted due to chatban time expired.`, true)
            .setFooter(`ID: ${member.user.id}`)
            .setTimestamp()

      let Embed2Member = new Discord.RichEmbed()
          .setColor("#ff4f4f")
          .setAuthor(`Chatbanned in the ${message.guild} server.`, member.user.displayAvatarURL)
          .setDescription(`\n\nLength: ${ms(ms(chatbantime), { long: true })}\nReason: ${reason}`)
          .setFooter(`Your ID: ${member.id}`)
          .setTimestamp()

await (member.addRole(chatbanrole.id));
await member.removeRoles([message.guild.roles.get("682282991262761047") || message.guild.roles.get("590932424238825472") || message.guild.roles.get("644474083437707264")])
if (member.voiceChannel) {
  member.setchatban(true);
}

message.delete();

try {
  await member.send(Embed2Member);
    } catch(e) {
  return;
}

message.channel.send(chatbanembed).catch(error => console.log(error))
logchannel.send(chatbanembedLog).catch(error => console.log(error))

//Keep chatband role until time = 0
  setTimeout(function() {
    member.removeRole(chatbanrole.id);
    if (member.voiceChannel) {
      member.setchatban(false);
    }

    logchannel.send(unchatbanembedLog)
    Embed2Member.setColor("#7aff7a")
    Embed2Member.setDescription(`Unchatbanned in ${message.guild}`)
    Embed2Member.setFooter("Unchatban due to: Timeout. | Please be sure to follow the rules.")

try {

    member.send(Embed2Member)
  } catch(e) {
    message.channel.send("Someone still has their DMs blocked. . .\nWell they're unchatbanned now.")
    }
  }, ms(chatbantime));

} else {

  let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!member) return message.channel.send(chatbanErrorEmbed);

  if (member === message.guild.me) {
    return message.channel.send("Not gonna chatban myself with this command, fella.")
  }

  if (member.highestRole.position >= message.member.highestRole.position) {
    return message.channel.send('You cannot chatban a member who is higher or has the same role as you!');
  }

  if (member === message.guild.owner) return message.channel.send(chatbanPermErrorOwnerEmbed);
  if (member.hasPermission("ADMINISTRATOR")) return message.channel.send(chatbanPermErrorAdminEmbed);
  if (member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_ROLES_OR_PERMISSIONS", "MANAGE_CHANNELS", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS"])) return message.channel.send(chatbanPermErrorModEmbed);

  if (member.id === message.author.id) {
    return message.channel.send("Imagine trying to chatban yourself.. ")
  }

  let reason = args.slice(2).join(" ");
  if (!reason) reason = "No reason given. Savage."

  let chatbanrole = message.guild.roles.find(role => role.name === "⛔ Chatbanned")
  //start of create role
  if (!chatbanrole) {
    try {
      chatbanrole = await message.guild.createRole({
        name: "⛔ Chatbanned",
        color: "#1b1b1b",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel) => {
        await channel.overwritePermissions(chatbanrole, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            READ_MESSAGE_HISTORY: false,
            SPEAK: false
        });
      });
    } catch(e) {
      console.log(e.stack);
    }
  }

  //end of create role

  //chatban time
  let chatbantime = args[1];
  if (!chatbantime) chatbantime = "60m";
  if (chatbantime === '1y') return message.channel.send("Chatbanning someone for this long is a lil harsh isn't it? Try with something lower. This **is** a year of no communication, might as well ban them.");

      const chatbanembed = new Discord.RichEmbed()
          .setColor("#7aff7a")
          .setAuthor('Successfully chatbanned!', member.user.avatarURL)
          .setDescription(`<@${member.user.id}> has been chatbanned`)

      let Embed2Member = new Discord.RichEmbed()
          .setColor("#ff4f4f")
          .setDescription(`Chatbanned in ${message.guild}`)
          .addField(`Chatban time: `, `**${ms(ms(chatbantime), { long: true })}**`, true)
          .addField(`Chatban reason: `, `**${reason}**`, false)

await (member.addRole(chatbanrole.id));
if (member.voiceChannel) {
  member.setchatban(true);
}
      
try {
  await member.send(Embed2Member);
  } catch(e) {
  message.channel.send("Someone has their DMs blocked. . . & they're chatbanned.")
}

let DidYouKnow = new Discord.RichEmbed()
.setDescription("Did you know you could log these actions?\nTry out `-logging`")

message.delete();
message.channel.send(chatbanembed).catch(error => console.log(error))
message.channel.send(DidYouKnow).then(m => m.delete(10000))

//Keep chatband role until time = 0
  setTimeout(function() {
    member.removeRole(chatbanrole.id);
    if (member.voiceChannel) {
      member.setchatban(false);
    }

    Embed2Member.setColor("#7aff7a")
    Embed2Member.setDescription(`Unchatbanned in ${message.guild}`)
    Embed2Member.setFooter("Unchatban due to: Timeout. | Please be sure to follow the rules.")

try {

    member.send(Embed2Member)
  } catch(e) {
    message.channel.send("Someone still has their DMs blocked. . .\nWell they're unchatbanned now.")
    }
  }, ms(chatbantime));

}

}

module.exports.help = {
  name: "chatban",
  aliases: []
}
