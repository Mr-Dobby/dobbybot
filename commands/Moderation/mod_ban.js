const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.cache.get(logName.incidentLog)

  const Failure = bot.emojis.cache.get("697388354689433611");
  const Sucess = bot.emojis.cache.get("697388354668462110");

  var noPermsEmbed = new Discord.MessageEmbed()
      .setDescription(`${Failure} Banning members requires you to have \`BAN MEMBERS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Banning members requires me to have \`BAN MEMBERS\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission("BAN_MEMBERS")) {
    return message.channel.send(noPermsEmbed);
  }

    if (logchannel)  {

    const banErrorEmbed = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setTitle(`\`Command: ${currPrefix.prefix}ban\``)
          .addField("**Description:**", "Ban a user from the server.")
          .addField("**Command usage:**", `${currPrefix.prefix}ban <@User> [Reason]`)
          .addField("**Example:**", `${currPrefix.prefix}ban @Mr.Dobby#0001 Spam`)
          .setFooter("<> = Required, [] = Optional")

    const banPermErrorModEmbed = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`${Failure} Member is a Moderator.`)

    const banPermErrorAdminEmbed = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`${Failure} Member is an Administrator.`)

    const banPermErrorOwnerEmbed = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setAuthor(`${message.author.tag} | Stupidity Error`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`${Failure} This is the server owner, nice try tho.`)

    let bUser = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!bUser) return message.channel.send(banErrorEmbed);
/*
    if (bUser.highestRole.position >= message.member.highestRole.position) {
      return message.channel.send('You cannot ban a member who is higher or has the same role as you!');
    }
*/
    if (bUser === message.guild.me) {
      return message.channel.send("Not gonna harm myself with this command, fella.")
    }

    if (bUser.id === message.author.id) {
      return message.channel.send("Imagine trying to ban yourself.. ");
    }

    if (bUser === message.guild.owner) return message.channel.send(banPermErrorOwnerEmbed);
    if (bUser.hasPermission("ADMINISTRATOR")) return message.channel.send(banPermErrorAdminEmbed);
    if (bUser.hasPermission(["KICK_MEMBERS" || "BAN_MEMBERS" || "MANAGE_MESSAGES" || "MANAGE_ROLES_OR_PERMISSIONS" || "MANAGE_CHANNELS" || "MUTE_MEMBERS" || "DEAFEN_MEMBERS" || "MOVE_MEMBERS"])) return message.channel.send(banPermErrorModEmbed)

    let bReason = args.join(" ").slice(22);
    if (!bReason) bReason = "No reason given.";

    let banEmbed = new Discord.MessageEmbed()
        .setColor("#7aff7a")
        .setAuthor('Successfully banned!', bUser.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} <@${bUser.user.id}> has been banned`)

    let banEmbedLog = new Discord.MessageEmbed()
        .setAuthor(`${bUser.user.tag} | Ban`, bUser.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`\`${currPrefix.prefix}ban <@User> [Reason]\``)
        .setColor("#ff0000")
        .addField("User", `<@${bUser.id}>`, true)
        .addField("Moderator", `<@${message.author.id}>`, true)
        .addField("Reason", `${bReason}`, true)
        .setFooter(`ID: ${bUser.user.id}`)
        .setTimestamp()

    let BuhByeEmbed = new Discord.MessageEmbed()
        .setAuthor(`${bUser.user.tag}, you were banned from the ${message.guild.name} server`, bUser.user.displayAvatarURL({ dynamic: true }))
        .setColor("#ff0000")
        .addField("Reason", bReason)
        .setFooter(`Your ID: ${bUser.user.id}`)
        .setTimestamp()

    await message.delete();
    await message.channel.send(banEmbed);
    await logchannel.send(banEmbedLog);
        try {
          await bUser.send(BuhByeEmbed);
            } catch(e) {}

        var target = message.guild.members.cache.get(bUser.id)
        target.ban()

  } else {

    let bUser = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!bUser) return message.channel.send(banErrorEmbed);
/*
    if (bUser.highestRole.position >= message.member.highestRole.position) {
      return message.channel.send('You cannot ban a member who is higher or has the same role as you!');
    }
*/
    if (bUser === message.guild.me) {
      return message.channel.send("Not gonna harm myself with this command, fella.")
    }

    if (bUser.id === message.author.id) {
      return message.channel.send("Imagine trying to ban yourself.. ");
    }

    if (bUser === message.guild.owner) return message.channel.send(banPermErrorOwnerEmbed);
    if (bUser.hasPermission("ADMINISTRATOR")) return message.channel.send(banPermErrorAdminEmbed);
    if (bUser.hasPermission(["KICK_MEMBERS" || "BAN_MEMBERS" || "MANAGE_MESSAGES" || "MANAGE_ROLES_OR_PERMISSIONS" || "MANAGE_CHANNELS" || "MUTE_MEMBERS" || "DEAFEN_MEMBERS" || "MOVE_MEMBERS"])) return message.channel.send(banPermErrorModEmbed)

    let bReason = args.join(" ").slice(22);
    if (!bReason) bReason = "No reason given.";

    let banEmbed = new Discord.MessageEmbed()
        .setColor("#7aff7a")
        .setAuthor('Successfully banned!', bUser.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`<@${bUser.user.id}> has been banned`)

    let BuhByeEmbed = new Discord.MessageEmbed()
        .setAuthor(`**${bUser.user.tag}**, you were banned from **${message.guild.name}**`, bUser.user.displayAvatarURL({ dynamic: true }))
        .setColor("#ff0000")
        .addField("Reason", bReason)
        .setFooter(`ID: ${bUser.user.id}`)
        .setTimestamp()

        await message.delete();
        await message.channel.send(banEmbed);
            try {
              await bUser.send(BuhByeEmbed);
                } catch(e) {}
    
        var target = message.guild.members.cache.get(bUser.id)
        target.ban()

  }

}

module.exports.help = {
  name: "ban",
  aliases: []
}
