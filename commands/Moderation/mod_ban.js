const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.get(logName.incidentLog)

  const Failure = bot.emojis.get("697388354689433611");
  const Sucess = bot.emojis.get("697388354668462110");

  var noPermsEmbed = new Discord.RichEmbed()
      .setDescription(`${Failure} Banning members requires you to have \`BAN MEMBERS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.RichEmbed()
      .setDescription(`${Failure} Banning members requires me to have \`BAN MEMBERS\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission("BAN_MEMBERS")) {
    return message.channel.send(noPermsEmbed);
  }

    if (logchannel)  {

    const banErrorEmbed = new Discord.RichEmbed()
          .setColor("#ff0000")
          .setTitle(`\`Command: ${currPrefix.prefix}ban\``)
          .addField("**Description:**", "Ban a user from the server.")
          .addField("**Command usage:**", `${currPrefix.prefix}ban <@User> [Reason]`)
          .addField("**Example:**", `${currPrefix.prefix}ban @Mr.Dobby#0001 Spam`)
          .setFooter("<> = Required, [] = Optional")

    const banPermErrorModEmbed = new Discord.RichEmbed()
          .setColor("#ff0000")
          .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL)
          .setDescription(`${Failure} Member is a Moderator.`)

    const banPermErrorAdminEmbed = new Discord.RichEmbed()
          .setColor("#ff0000")
          .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL)
          .setDescription(`${Failure} Member is an Administrator.`)

    const banPermErrorOwnerEmbed = new Discord.RichEmbed()
          .setColor("#ff0000")
          .setAuthor(`${message.author.tag} | Stupidity Error`, message.author.displayAvatarURL)
          .setDescription(`${Failure} This is the server owner, nice try tho.`)

    let bUser = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.channel.send(banErrorEmbed);

    if (bUser.highestRole.position >= message.member.highestRole.position) {
      return message.channel.send('You cannot ban a member who is higher or has the same role as you!');
    }

    if (bUser === message.guild.me) {
      return message.channel.send("Not gonna harm myself with this command, fella.")
    }

    if (bUser.id === message.author.id) {
      return message.channel.send("Imagine trying to ban yourself.. ");
    }

    if (bUser === message.guild.owner) return message.channel.send(banPermErrorOwnerEmbed);
    if (bUser.hasPermission("ADMINISTRATOR")) return message.channel.send(banPermErrorAdminEmbed);
    if (bUser.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_ROLES_OR_PERMISSIONS", "MANAGE_CHANNELS", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS"])) return message.channel.send(banPermErrorModEmbed)

    let bReason = args.join(" ").slice(22);
    if (!bReason) bReason = "No reason given.";

    let banEmbed = new Discord.RichEmbed()
        .setColor("#7aff7a")
        .setAuthor('Successfully banned!', bUser.user.displayAvatarURL)
        .setDescription(`${Sucess} <@${bUser.user.id}> has been banned`)

    let banEmbedLog = new Discord.RichEmbed()
        .setAuthor(`${bUser.user.tag} | Ban 🚫`, bUser.user.displayAvatarURL)
        .setDescription(`\`${currPrefix.prefix}ban <@User> [Reason]\``)
        .setColor("#ff0000")
        .addField("User", `${bUser.user.tag}\n<@${bUser.id}>`, true)
        .addField("Moderator", `${message.author.tag}\n<@${message.author.id}>`, true)
        .addField("Reason", `${bReason}`, true)
        .setFooter(`ID: ${bUser.user.id}`)
        .setTimestamp()

    let BuhByeEmbed = new Discord.RichEmbed()
        .setAuthor(`${bUser.user.tag}, you were banned from the ${message.guild.name} server`, bUser.user.displayAvatarURL)
        .setColor("#ff0000")
        .addField("Reason", bReason)
        .setFooter(`Your ID: ${bUser.user.id}`)
        .setTimestamp()

    await message.delete();
    await message.channel.send(banEmbed);
    await logchannel.send(banEmbedLog);
        try {
          await bUser.send(BuhByeEmbed);
            } catch(e) {
          return;
        }

    await message.guild.member(bUser).ban({
        days: 7,
        reason: `Ban | ${message.author.tag}: ${bReason}`
      })

  } else {

    let bUser = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.channel.send(banErrorEmbed);

    if (bUser.highestRole.position >= message.member.highestRole.position) {
      return message.channel.send('You cannot ban a member who is higher or has the same role as you!');
    }

    if (bUser === message.guild.me) {
      return message.channel.send("Not gonna harm myself with this command, fella.")
    }

    if (bUser.id === message.author.id) {
      return message.channel.send("Imagine trying to ban yourself.. ");
    }

    if (bUser === message.guild.owner) return message.channel.send(banPermErrorOwnerEmbed);
    if (bUser.hasPermission("ADMINISTRATOR")) return message.channel.send(banPermErrorAdminEmbed);
    if (bUser.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_ROLES_OR_PERMISSIONS", "MANAGE_CHANNELS", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS"])) return message.channel.send(banPermErrorModEmbed)

    let bReason = args.join(" ").slice(22);
    if (!bReason) bReason = "No reason given.";

    let banEmbed = new Discord.RichEmbed()
        .setColor("#7aff7a")
        .setAuthor('Successfully banned!', bUser.user.displayAvatarURL)
        .setDescription(`<@${bUser.user.id}> has been banned`)

    let BuhByeEmbed = new Discord.RichEmbed()
        .setAuthor(`**${bUser.user.tag}**, you were banned from **${message.guild.name}**`, bUser.user.displayAvatarURL)
        .setColor("#ff0000")
        .addField("Reason", bReason)
        .setFooter(`ID: ${bUser.user.id}`)
        .setTimestamp()

        try {
          await bUser.send(BuhByeEmbed);
            } catch(e) {
          return;
        }

      message.guild.member(bUser).ban({
        reason: `Ban | ${message.author.tag}: ${bReason}`
      })
      message.delete();
      message.channel.send(banEmbed);

  }

}

module.exports.help = {
  name: "ban",
  aliases: []
}
