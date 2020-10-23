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
      .setDescription(`${Failure} Chatbanning members requires you to have \`MANAGE MESSAGES\` and \`MUTE MEMBERS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Chatbanning members requires me to have \`MANAGE CHANNELS\`, \`MANAGE ROLES\`, \`MUTE MEMBERS\` and \` MANAGE MEMBERS\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission(["MANAGE_MESSAGES" && "MUTE_MEMBERS"])) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission(["MANAGE_CHANNELS" && "MANAGE_ROLES" && "MANAGE_MEMBERS" && "MUTE_MEMBERS"])) {
    return message.channel.send(noPermsEmbed);
  }

  if (logchannel) {

    const chatbanPermErrorModEmbed = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`${Failure} Member is a Moderator.`)

    const chatbanPermErrorAdminEmbed = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setAuthor(`${message.author.tag} | Permission Error`)
          .setDescription(`${Failure} Member is an Administrator.`, message.author.displayAvatarURL({ dynamic: true }))

    const chatbanPermErrorOwnerEmbed = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setAuthor(`${message.author.tag} | Stupidity Error`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`${Failure} This is the server owner, nice try tho.`)

    const chatbanErrorEmbed = new Discord.MessageEmbed()
          .setColor("#ff4f4f")
          .setTitle(`\`Command: ${currPrefix.prefix}chatban\``)
          .addField("**Description:**", "Chatban a user. Deny them from viewing __**any**__ channels.")
          .addField("**Command usage:**", `${currPrefix.prefix}chatban <@User> [Reason]`)
          .addField("**Example:**", `${currPrefix.prefix}chatban @Mr.Dobby#0001 Spam`)
          .setFooter("Chatban time: forever. | <> = Required, [] = Optional")

  let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if (!member) return message.channel.send(chatbanErrorEmbed);

  if (member === message.guild.me) {
    return message.channel.send("Not gonna chatban myself with this command, fella.")
  }
/*
  if (member.highestRole.position >= message.member.highestRole.position) {
    return message.channel.send('You cannot chatban a member who is higher or has the same role as you!');
  }
*/
  if (member === message.guild.owner) return message.channel.send(chatbanPermErrorOwnerEmbed);
  if (member.hasPermission("ADMINISTRATOR")) return message.channel.send(chatbanPermErrorAdminEmbed);
  if (member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_ROLES", "MANAGE_CHANNELS", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS"])) return message.channel.send(chatbanPermErrorModEmbed);

  if (member.id === message.author.id) {
    return message.channel.send("Imagine trying to chatban yourself.. ")
  }

  const AlreadyChatbannedEmbed = new Discord.MessageEmbed()
  .setColor("#ff0000")
  .setAuthor(`${member.user.tag} | Chatban`, member.user.displayAvatarURL({ dynamic: true }))
  .setDescription(`${Failure} ${member} is already chatbanned`)

  let chatbanrole = currPrefix.chatbanRole;
  if (member.roles.cache.has(chatbanrole)) return message.channel.send(AlreadyChatbannedEmbed)
  //start of create role
  if (!message.guild.roles.cache.get(chatbanrole) || currPrefix.chatbanRole == "") {
    try {
      chatbanrole = await message.guild.roles.create({
        data: {
          name: "⛔ Chatbanned",
          color: "#1b1b1b",
          permissions:[]
        }
      })
      message.guild.channels.cache.forEach(async (channel) => {
        await channel.overwritePermissions([
          {
            id: chatbanrole.id,
            deny: ['VIEW_CHANNEL', 
            'SEND_MESSAGES',
            'ADD_REACTIONS',
            'READ_MESSAGE_HISTORY',
            'SPEAK'],
          }
        ])
      });
    } catch(e) {
      console.log(e.stack);
    }
    await Servers.findOneAndUpdate({ guildID: message.guild.id }, { $set: { chatbanRole: chatbanrole.id } }, { new: true })
  }

  let reason = args.slice(1).join(" ");
  if (!reason) reason = "No reason given. Savage."

      const chatbanembed = new Discord.MessageEmbed()
            .setColor("#7aff7a")
            .setAuthor('Successfully chatbanned!', member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${Sucess} <@${member.user.id}> has been chatbanned`)

      const chatbanembedLog = new Discord.MessageEmbed()
            .setAuthor(`${member.user.tag} | Chatban`, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`\`${currPrefix.prefix}chatban <@User> [Reason]\``)
            .setColor("#ff4f4f")
            .addField("User:", `<@${member.user.id}>`, true)
            .addField("Moderator", `<@${message.author.id}>`, true)
            .addField("Reason", `${reason}`, false)
            .setFooter(`ID: ${member.user.id}`)
            .setTimestamp()

      let Embed2Member = new Discord.MessageEmbed()
          .setColor("#ff4f4f")
          .setAuthor(`Chatbanned in the ${message.guild} server.`, member.user.displayAvatarURL({ dynamic: true }))
          .setDescription(`\nReason: ${reason}`)
          .setFooter(`Your ID: ${member.id}`)
          .setTimestamp()

await (member.roles.add(chatbanrole));
message.delete();

try {
  await member.send(Embed2Member);
    } catch(e) {
  return;
}

message.channel.send(chatbanembed).catch(error => console.log(error))
logchannel.send(chatbanembedLog).catch(error => console.log(error))

} else {

  let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if (!member) return message.channel.send(chatbanErrorEmbed);

  if (member === message.guild.me) {
    return message.channel.send("Not gonna chatban myself with this command, fella.")
  }

  if (member.highestRole.position >= message.member.highestRole.position) {
    return message.channel.send('You cannot chatban a member who is higher or has the same role as you!');
  }

  if (member === message.guild.owner) return message.channel.send(chatbanPermErrorOwnerEmbed);
  if (member.hasPermission("ADMINISTRATOR")) return message.channel.send(chatbanPermErrorAdminEmbed);
  if (member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_ROLES", "MANAGE_CHANNELS", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS"])) return message.channel.send(chatbanPermErrorModEmbed);

  if (member.id === message.author.id) {
    return message.channel.send("Imagine trying to chatban yourself.. ")
  }

  let chatbanrole = currPrefix.chatbanRole;
  if (member.roles.cache.has(chatbanrole)) return message.channel.send(AlreadyChatbannedEmbed)
  //start of create role
  if (!message.guild.roles.cache.get(chatbanrole) || currPrefix.chatbanRole == "") {
    try {
      chatbanrole = await message.guild.roles.create({
        data: {
          name: "⛔ Chatbanned",
          color: "#1b1b1b",
          permissions:[]
        }
      })
      message.guild.channels.cache.forEach(async (channel) => {
        await channel.overwritePermissions([
          {
            id: chatbanrole.id,
            deny: ['VIEW_CHANNEL', 
            'SEND_MESSAGES',
            'ADD_REACTIONS',
            'READ_MESSAGE_HISTORY',
            'SPEAK'],
          }
        ])
      });
    } catch(e) {
      console.log(e.stack);
    }
    await Servers.findOneAndUpdate({ guildID: message.guild.id }, { $set: { chatbanRole: chatbanrole.id } }, { new: true })
  }

  let reason = args.slice(1).join(" ");
  if (!reason) reason = "No reason given. Savage."

      const chatbanembed = new Discord.MessageEmbed()
          .setColor("#7aff7a")
          .setAuthor('Successfully chatbanned!', member.user.displayAvatarURL({ dynamic: true }))
          .setDescription(`<@${member.user.id}> has been chatbanned`)

      let Embed2Member = new Discord.MessageEmbed()
          .setColor("#ff4f4f")
          .setDescription(`Chatbanned in ${message.guild}`)
          .addField(`Chatban reason: `, `**${reason}**`, false)

await (member.roles.add(chatbanrole));
if (member.voice.channel) {
  member.setMute(true);
}
      
  try {
    await member.send(Embed2Member);
    } catch(e) {
    return;
  }

  let DidYouKnow = new Discord.MessageEmbed()
  .setDescription("Did you know you could log these actions?\nTry out `-logging`")

  message.delete();
  message.channel.send(chatbanembed).catch(error => console.log(error))
  message.channel.send(DidYouKnow).then(m => m.delete({ timeout: 10000 }))

  } 

}

module.exports.help = {
  name: "chatban",
  aliases: []
}
