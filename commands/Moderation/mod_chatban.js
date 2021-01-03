const Discord = require("discord.js");
const ms = require("ms");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.cache.get(logName.incidentLog)
  let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
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
      .addField("**Command usage:**", `${currPrefix.prefix}chatban <@User> <Time> [Reason]`)
      .addField("**Example:**", `${currPrefix.prefix}chatban @Mr.Dobby#0001 Spam`)
      .setFooter("Chatban time: forever. | <> = Required, [] = Optional")

    const AlreadyChatbannedEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${member.user.tag} | Chatban`, member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} ${member} is already chatbanned`)

    if (member === message.guild.me || member.id === message.author.id) {
      return;
    }
    if (member === message.guild.owner) return message.channel.send(chatbanPermErrorOwnerEmbed);
    if (member.hasPermission("ADMINISTRATOR")) return message.channel.send(chatbanPermErrorAdminEmbed);
    if (member.hasPermission("KICK_MEMBERS" || "BAN_MEMBERS" || "MANAGE_MESSAGES" || "MANAGE_ROLES" || "MANAGE_CHANNELS" || "MUTE_MEMBERS" || "DEAFEN_MEMBERS" || "MOVE_MEMBERS")) return message.channel.send(chatbanPermErrorModEmbed);

    if (!member) return message.channel.send(chatbanErrorEmbed);

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
      } catch(e) {
        console.log(e.stack);
      }
      await Servers.findOneAndUpdate({ guildID: message.guild.id }, { $set: { chatbanRole: chatbanrole.id } }, { new: true })
      message.guild.channels.cache.forEach(channel => {
        channel.updateOverwrite(chatbanrole, { VIEW_CHANNEL: false });
      });
    }
  
    let chatbantime = args[1];
    if (!chatbantime) chatbantime = "60m";
    let reason = args.slice(2).join(' ');
    if (!reason) reason = 'No reason given. Savage'
  
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
            .addField("Time", `${ms(ms(chatbantime), { long: true })}`, true)
            .addField("Reason", `${reason}`, false)
            .setFooter(`ID: ${member.user.id}`)
            .setTimestamp()

        const AutoEmbed = new Discord.MessageEmbed()
            .setAuthor(`${member.user.tag} | Auto unchatban`, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`\`${currPrefix.prefix}chatban <@User> [Reason]\``)
            .setColor("#7aff7a")
            .addField("User:", `<@${member.user.id}>`, true)
            .addField("Reason", `Auto | Time Expired.`, true)
            .setFooter(`ID: ${member.user.id}`)
            .setTimestamp()
  
    message.delete();
    await (member.roles.add(chatbanrole));
    if (member.voice.channel) {
      member.setMute(true);
    }

  if (logchannel) {

    await logchannel.send(chatbanembedLog);
    await message.channel.send(chatbanembed);
    
  } else {

    await message.channel.send(chatbanembed);

  }

  setTimeout(function() {
    try {
      member.roles.remove(chatbanrole);
      if (member.voice.channel) {
        member.setMute(false);
      }
      logchannel.send(AutoEmbed)
    } catch(e) {
      console.log(e)
    }
  }, ms(chatbantime));

}

module.exports.help = {
  name: "chatban",
  aliases: []
}
