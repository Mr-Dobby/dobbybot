const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.cache.get(logName.incidentLog)
  let kUser = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
  const Failure = bot.emojis.cache.get("697388354689433611");
  const Sucess = bot.emojis.cache.get("697388354668462110");

  var noPermsEmbed = new Discord.MessageEmbed()
      .setDescription(`${Failure} Kicking members requires you to have \`KICK MEMBERS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Kicking members requires me to have \`KICK MEMBERS\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission("KICK_MEMBERS")) {
    return message.channel.send(noPermsEmbed);
  }

    const kickErrorEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTitle(`\`Command: ${currPrefix.prefix}kick\``)
      .addField("**Description:**", "Kick a user from the server.")
      .addField("**Command usage:**", `${currPrefix.prefix}kick <@User> [Reason]`)
      .addField("**Example:**", `${currPrefix.prefix}kick @Mr.Dobby#0001 Spam`)
      .setFooter("<> = Required, [] = Optional")

    if (!kUser) return message.channel.send(kickErrorEmbed);
    const kickPermErrorModEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} Member is a Moderator.`)

    const kickPermErrorAdminEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} Member is an Administrator.`)

    const kickPermErrorOwnerEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${message.author.tag} | Stupidity Error`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} This is the server owner, nice try tho.`)

    const kickFail = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${message.author.tag} | Unable to kick member`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} <@${kUser.id}> cannot be kicked due to permissions`)

    if (kUser === message.guild.me || kUser.id === message.author.id) {
      return;
    }
    if (kUser === message.guild.owner) return message.channel.send(kickPermErrorOwnerEmbed);
    if (kUser.hasPermission("ADMINISTRATOR")) return message.channel.send(kickPermErrorAdminEmbed);
    if (kUser.hasPermission(["KICK_MEMBERS" || "KICK_MEMBERS" || "MANAGE_MESSAGES" || "MANAGE_ROLES_OR_PERMISSIONS" || "MANAGE_CHANNELS" || "MUTE_MEMBERS" || "DEAFEN_MEMBERS" || "MOVE_MEMBERS"])) return message.channel.send(kickPermErrorModEmbed)
    const memberPosition = kUser.roles.highest.position;
		const moderationPosition = message.member.roles.highest.position;
		if (message.member.ownerID !== message.author.id && !(moderationPosition > memberPosition)) {
			return message.channel.send(kickFail)
		}

		if (!kUser.kickable) {
			return message.channel.send(kickFail)
    }
    
    let kReason = args.join(" ").slice(22);
    if (!kReason) kReason = "No reason given.";

    let kickEmbed = new Discord.MessageEmbed()
        .setColor("#7aff7a")
        .setAuthor('Successfully kicked!', kUser.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Sucess} <@${kUser.user.id}> has been kicked`)

    let kickEmbedLog = new Discord.MessageEmbed()
        .setAuthor(`${kUser.user.tag} | Kick`, kUser.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`\`${currPrefix.prefix}kick <@User> [Reason]\``)
        .setColor("#ff0000")
        .addField("User", `<@${kUser.id}>`, true)
        .addField("Moderator", `<@${message.author.id}>`, true)
        .addField("Reason", `${kReason}`, true)
        .setFooter(`ID: ${kUser.user.id}`)
        .setTimestamp()

        await message.delete();
        await message.guild.members.kick(kUser, { kReason } );

    if (logchannel) {

      await logchannel.send(kickEmbedLog);
      await message.channel.send(kickEmbed);

    } else {

      await message.channel.send(kickEmbed);

    }

}

module.exports.help = {
  name: "kick",
  aliases: []
}
