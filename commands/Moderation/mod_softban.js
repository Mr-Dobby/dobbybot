const Discord = require("discord.js");
const Servers = require("../../lib/mongodb");
const Logs = require("../../lib/logs");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )

  let logName = await Logs.findOne( { guildID: message.guild.id } )
  const logchannel = bot.channels.cache.get(logName.incidentLog)
  let bUser = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
  const Failure = bot.emojis.cache.get(require("../../storage/config.json").emojis.Failure); 
  const Success = bot.emojis.cache.get(require("../../storage/config.json").emojis.Success);

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

    const banErrorEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTitle(`\`Command: ${currPrefix.prefix}softban\``)
      .addField("**Description:**", "Softban a user from the server.")
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

    if (bUser === message.guild.me || bUser.id === message.author.id) {
      return;
    }
    if (!bUser) return message.channel.send(banErrorEmbed);
    if (bUser === message.guild.owner) return message.channel.send(banPermErrorOwnerEmbed);
    if (bUser.hasPermission("ADMINISTRATOR")) return message.channel.send(banPermErrorAdminEmbed);
    if (bUser.hasPermission(["KICK_MEMBERS" || "BAN_MEMBERS" || "MANAGE_MESSAGES" || "MANAGE_ROLES_OR_PERMISSIONS" || "MANAGE_CHANNELS" || "MUTE_MEMBERS" || "DEAFEN_MEMBERS" || "MOVE_MEMBERS"])) return message.channel.send(banPermErrorModEmbed)

    let bReason = args.join(" ").slice(22);
    if (!bReason) bReason = "No reason given.";

    let banEmbed = new Discord.MessageEmbed()
        .setColor("#7aff7a")
        .setAuthor('Successfully softbanned!', bUser.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`${Success} <@${bUser.user.id}> has been softbanned`)

    let banEmbedLog = new Discord.MessageEmbed()
        .setAuthor(`${bUser.user.tag} | Softban`, bUser.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`\`${currPrefix.prefix}softban <@User> [Reason]\``)
        .setColor("#ff0000")
        .addField("User", `<@${bUser.id}>`, true)
        .addField("Moderator", `<@${message.author.id}>`, true)
        .addField("Reason", `${bReason}`, true)
        .setFooter(`ID: ${bUser.user.id}`)
        .setTimestamp()

        await message.delete();
        await bUser.ban();
        await bUser.unban();

    if (logchannel) {

      await logchannel.send(banEmbedLog);
      await message.channel.send(banEmbed);

    } else {

      await message.channel.send(banEmbed);

    }

}

module.exports.help = {
  name: "softban",
  aliases: []
}
