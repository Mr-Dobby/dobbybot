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
      .setDescription(`${Failure} Softbanning a member requires you to have \`BAN MEMBERS\` permissions.`)
      .setColor("#ff0000")
    
  var noPermsEmbedBot = new Discord.MessageEmbed()
      .setDescription(`${Failure} Softbanning a member requires me to have \`BAN MEMBERS\` permissions.`)
      .setColor("#ff0000")

  if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return message.channel.send(noPermsEmbedBot)
  }

  if (!message.member.hasPermission("BAN_MEMBERS")) {
    return message.channel.send(noPermsEmbed);
  }

      if (!logchannel) {

      let softbanErrorEmbed = new Discord.MessageEmbed()
          .setColor("#ff4f4f")
          .setTitle(`\`Command: ${currPrefix.prefix}softban\``)
          .addField("**Description:**", "Softbans a user from the server. They will be banned for a day.", false)
          .addField("**Command usage:**", `${currPrefix.prefix}softban <@User> [Reason]`, false)
          .addField("**Example:**", `${currPrefix.prefix}softban @Mr.Dobby#0001 Naughty boi`, false)
          .setFooter("<> = Required, [] = Optional")

      let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.cache.get(args[0]));
      let reason = args.join(" ").slice(22);
      if (!reason) reason = `No reason given. Softbanned by ${message.author.tag}`
      if (!member) return message.channel.send(softbanErrorEmbed);

      if (member === message.guild.me) {
        return message.channel.send("Not gonna harm myself with this command, fella.")
      }

      if (member.highestRole.position >= message.member.highestRole.position) {
        return message.channel.send('You cannot softban a member who is higher or has the same role as you!');
      }

          await member.ban({
            reason: `Softban | ${message.author.tag}: ${reason}`
        });

        let softbanSuccessEmbed = new Discord.MessageEmbed()
        .setColor("#7aff7a")
        .setAuthor('Successfully softbanned!', member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`<@${member.user.id}> has been softbanned`)

        message.delete();
        message.channel.send(softbanSuccessEmbed)

  // 1 day in ms = 86,400,000
  let Min2MS = 60000;
  let Day2Min = 1440;

  setTimeout(function() {

    member.unban()

    }, ms(Min2MS * Day2Min))

  } else {

  let member = message.guild.member(message.mentions.users.last() || message.mentions.users.first() || message.guild.members.cache.get(args[0]));

  if (!message.member.hasPermission("BAN_MEMBERS")) {
    return message.channel.send("You need `BAN MEMBERS` permission.");
  }

  let softbanErrorEmbed = new Discord.MessageEmbed()
  .setColor("#ff4f4f")
  .setTitle(`\`Command: ${currPrefix.prefix}softban\``)
  .addField("**Description:**", "Softbans a user from the server. They will be banned for a day.", false)
  .addField("**Command usage:**", `${currPrefix.prefix}softban <@User> [Reason]`, false)
  .addField("**Example:**", `${currPrefix.prefix}softban @Mr.Dobby#0001 Naughty boi`, false)
  .setFooter("<> = Required, [] = Optional")

const softbanPermErrorModEmbed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Failure} Member is a Moderator.`)

const softbanPermErrorAdminEmbed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setAuthor(`${message.author.tag} | Permission Error`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Failure} Member is an Administrator.`)

const softbanPermErrorOwnerEmbed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setAuthor(`${message.author.tag} | Stupidity Error`, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Failure} This is the server owner, nice try tho.`)

if (!member) return message.channel.send(softbanErrorEmbed);
if (member === message.guild.owner) return message.channel.send(softbanPermErrorOwnerEmbed);
if (member.hasPermission("ADMINISTRATOR")) return message.channel.send(softbanPermErrorAdminEmbed);
if (member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_ROLES_OR_PERMISSIONS", "MANAGE_CHANNELS", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS"])) return message.channel.send(softbanPermErrorModEmbed)

let reason = args.join(" ").slice(22);
if (!reason) reason = `No reason given.`

if (member === message.guild.me) {
  return message.channel.send("Not gonna harm myself with this command, fella.")
}

if (member.highestRole.position >= message.member.highestRole.position) {
  return message.channel.send('You cannot softban a member who is higher or has the same role as you!');
}

let softbanEmbed = new Discord.MessageEmbed()
    .setAuthor(`${member.user.tag} | Softban`, member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`\`${currPrefix.prefix}softban <@User> [Reason]\``)
    .setColor("#ff3d3d")
    .addField("User", `<@${member.id}>`, true)
    .addField("Moderator", `<@${message.author.id}>`, true)
    .addField("Reason", reason)
    .setFooter(`ID: ${member.user.id}`)
    .setTimestamp();

let softbanSuccessEmbed = new Discord.MessageEmbed()
    .setColor("#7aff7a")
    .setAuthor('Successfully softbanned!', member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`${Sucess} <@${member.user.id}> has been softbanned`)
  
let BuhByeEmbed = new Discord.MessageEmbed()
    .setAuthor(`${member.user.tag}, you were softbanned from the ${message.guild.name} server`, member.user.displayAvatarURL({ dynamic: true }))
    .setColor("#ff0000")
    .addField("Reason", reason)
    .setFooter(`Your ID: ${member.user.id}`)
    .setTimestamp()
  
    await message.delete();
    await message.channel.send(softbanSuccessEmbed)
    await logchannel.send(softbanEmbed)

    try {
      member.send(BuhByeEmbed)
        } catch(e) {
      return;
    }

    await member.ban({
      reason: `Softban | ${message.author.tag}: ${reason}`
    });

  // 1 day in ms = 86,400,000
  let Min2MS = 60000;
  let Day2Min = 1440;

  setTimeout(function() {

    member.unban()

    }, ms(Min2MS * Day2Min))
  }

}

module.exports.help = {
  name: "softban",
  aliases: []
}
