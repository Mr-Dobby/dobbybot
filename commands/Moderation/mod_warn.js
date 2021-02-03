const Discord = require("discord.js");
const Warns = require("../../lib/warns");
const mongoose = require('mongoose');
const Servers = require("../../lib/mongodb");

module.exports.run = async (bot, message, args, client) => {

  let currPrefix = await Servers.findOne( { guildID: message.guild.id } )
  return;
  await mongoose.connect('mongodb://localhost:27017/Dobby_Bot', {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
      if (err) return console.error(err)
    });

  if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
    return message.channel.send("I require Administrative permissions to run this command.")
  }

  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send('You need `MANAGE MESSAGES` permission')
  }

  const Failure = bot.emojis.cache.get(require("../../storage/config.json").emojis.Failure); 
  const Success = bot.emojis.cache.get(require("../../storage/config.json").emojis.Success);

  let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  let reason = args.slice(1).join(" ");

  const warnPermErrorModEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} Member is a Moderator.`)

  const warnPermErrorAdminEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} Member is an Administrator.`)

  const warnPermErrorOwnerEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setAuthor(`${message.author.tag} | Stupidity Error`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Failure} This is the server owner, nice try tho.`)

  const warnErrorEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTitle(`\`Command: ${currPrefix.prefix}warn\``)
      .addField("**Description:**", "Log a warning for a user.")
      .addField("**Command usage:**", `${currPrefix.prefix}warn <@User> [Reason]`)
      .addField("**Example:**", `${currPrefix.prefix}warn @Mr.Dobby#0001 He was toxic`)
      .setFooter("<> = Required, [] = Optional")

  const warnSuccessEmbed = new Discord.MessageEmbed()
      .setColor("#ff4f4f")
      .setAuthor('Successfully warned!', member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${Sucess} <@${member.user.id}> has been warned`)

  if (member.id === message.author.id) return;
  if (member === message.guild.owner) return message.channel.send(warnPermErrorOwnerEmbed);
  if (member.hasPermission("ADMINISTRATOR")) return message.channel.send(warnPermErrorAdminEmbed);
  if (member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_ROLES_OR_PERMISSIONS", "MANAGE_CHANNELS", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS"])) return message.channel.send(warnPermErrorModEmbed);
  if (!member) return message.channel.send(warnErrorEmbed)
  if (!reason) reason = `No reason given.`;

  const warnEmbed2Member = new Discord.MessageEmbed()
      .setColor("#ff4f4f")
      .setDescription(`<@${member.user.id}> you were warned in **${message.guild.name}**\nWarned for: ${reason}`)

    const warning = new Warns({

      _id: mongoose.Types.ObjectId(),
      guildID: message.guild.id,
      warnedUsername: member.user.tag,
      warnedID: member.user.id,
      reason: reason,
      moderator: message.author.tag,
      moderatorID: message.author.id,
      time: message.createdAt.toLocaleString().substr(0, 24)

    });

    await warning.save();
    await message.delete();
    await message.channel.send(warnSuccessEmbed);
    try {
      member.send(warnEmbed2Member)
          } catch(e) {
        return;
      }

}

module.exports.help = {
  name: "warn",
  aliases: []
}
